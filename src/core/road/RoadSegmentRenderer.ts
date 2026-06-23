import * as THREE from 'three'
import type { RoadNetwork, RoadSegment } from '../../types/roadNetwork'
import type { RoadType } from '../../types/roadType'
import { RoadGeometryBuilder } from './RoadGeometryBuilder'

export class RoadSegmentRenderer {
  private builder = new RoadGeometryBuilder()

  build(segment: RoadSegment, roadType: RoadType, network?: RoadNetwork): THREE.Group {
    const g = new THREE.Group()
    g.name = `road:${segment.id}`
    g.userData.segmentId = segment.id
    const start = network?.nodes.find(n => n.id === segment.startNodeId)?.position ?? new THREE.Vector3()
    const end = network?.nodes.find(n => n.id === segment.endNodeId)?.position ?? new THREE.Vector3(10, 0, 0)
    const path = this.builder.sampleSegment(segment, start, end)
    const mesh = new THREE.Mesh(this.builder.buildSurfaceGeometry(path, roadType), new THREE.MeshStandardMaterial({ color: roadType.material.surfaceColor, roughness: 0.9, side: THREE.DoubleSide }))
    mesh.userData.segmentId = segment.id
    g.add(mesh)
    for (const line of this.builder.buildLaneCenterLines(path, roadType)) g.add(this.tube(line, roadType.material.markingColor, 0.045))
    g.add(this.tube(path, 0xfacc15, 0.035))
    return g
  }

  private tube(points: THREE.Vector3[], color: number, radius: number) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => p.clone().add(new THREE.Vector3(0, 0.08, 0))))
    return new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(2, points.length * 2), radius, 6, false), new THREE.MeshBasicMaterial({ color }))
  }
}
