import * as THREE from 'three'
import type { RoadSegment } from '../../types/roadNetwork'
import type { RoadType } from '../../types/roadType'
import { getRoadTypeWidth } from '../../types/roadType'
import { buildRibbon, offsetPolyline } from '../../utils/geometry'
import { sampleLine, sampleQuadraticBezier, sampleCatmullRom } from '../../utils/curve'

export class RoadGeometryBuilder {
  sampleSegment(segment: RoadSegment, start: THREE.Vector3, end: THREE.Vector3): THREE.Vector3[] {
    if (segment.curveType === 'bezier' && segment.controlPoints[0]) return sampleQuadraticBezier(start, segment.controlPoints[0], end, 32)
    if (segment.curveType === 'catmullRom') return sampleCatmullRom([start, ...segment.controlPoints, end], 32)
    return sampleLine(start, end, 8)
  }

  buildRoadPolygon(path: THREE.Vector3[], roadType: RoadType): THREE.Vector3[] {
    return buildRibbon(path, getRoadTypeWidth(roadType))
  }

  buildSurfaceGeometry(path: THREE.Vector3[], roadType: RoadType): THREE.BufferGeometry {
    const poly = this.buildRoadPolygon(path, roadType)
    const shape = new THREE.Shape()
    shape.moveTo(poly[0].x, poly[0].z)
    for (let i = 1; i < poly.length; i++) shape.lineTo(poly[i].x, poly[i].z)
    shape.closePath()
    const geo = new THREE.ShapeGeometry(shape)
    geo.rotateX(-Math.PI / 2)
    geo.translate(0, 0.03, 0)
    return geo
  }

  buildLaneCenterLines(path: THREE.Vector3[], roadType: RoadType): THREE.Vector3[][] {
    const total = roadType.forwardLaneCount + roadType.backwardLaneCount
    if (total <= 1) return []
    const width = getRoadTypeWidth(roadType)
    const leftPad = roadType.hasSidewalk ? roadType.sidewalkWidth : 0
    const result: THREE.Vector3[][] = []
    for (let i = 1; i < total; i++) {
      const offset = -width / 2 + leftPad + i * roadType.laneWidth
      result.push(offsetPolyline(path, offset))
    }
    return result
  }
}
