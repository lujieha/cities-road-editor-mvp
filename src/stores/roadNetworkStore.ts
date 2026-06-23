import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as THREE from 'three'
import type { RoadNetwork, RoadNode, RoadSegment, LaneConnection } from '../types/roadNetwork'
import type { Intersection } from '../types/intersection'
import { createDefaultRoadTypes } from '../core/road/RoadTypeFactory'

function vec(p: any) { return new THREE.Vector3(p.x, p.y, p.z) }

export const useRoadNetworkStore = defineStore('roadNetwork', () => {
  const nodes = ref<RoadNode[]>([])
  const segments = ref<RoadSegment[]>([])
  const intersections = ref<Intersection[]>([])
  const laneConnections = ref<LaneConnection[]>([])
  const roadTypes = ref(createDefaultRoadTypes())

  function snapshot(): RoadNetwork {
    return {
      nodes: nodes.value.map(n => ({ ...n, position: n.position.clone(), connectedSegmentIds: [...n.connectedSegmentIds] })),
      segments: segments.value.map(s => ({ ...s, controlPoints: s.controlPoints.map(p => p.clone()), forwardLanes: [...s.forwardLanes], backwardLanes: [...s.backwardLanes], markings: [...s.markings], signs: [...s.signs] })),
      intersections: intersections.value,
      roadTypes: roadTypes.value,
      laneConnections: laneConnections.value
    }
  }

  function restore(net: RoadNetwork) {
    nodes.value = (net.nodes ?? []).map(n => ({ ...n, position: vec(n.position), connectedSegmentIds: [...n.connectedSegmentIds] }))
    segments.value = (net.segments ?? []).map(s => ({ ...s, controlPoints: (s.controlPoints ?? []).map(vec), forwardLanes: s.forwardLanes ?? [], backwardLanes: s.backwardLanes ?? [], markings: s.markings ?? [], signs: s.signs ?? [] }))
    intersections.value = net.intersections ?? []
    laneConnections.value = net.laneConnections ?? []
    roadTypes.value = net.roadTypes ?? createDefaultRoadTypes()
  }

  function exportJson() {
    return JSON.stringify(snapshot(), (_k, v) => v && v.isVector3 ? { x: v.x, y: v.y, z: v.z } : v, 2)
  }

  function importJson(text: string) { restore(JSON.parse(text)) }
  return { nodes, segments, intersections, laneConnections, roadTypes, snapshot, restore, exportJson, importJson }
})
