import type { Vector3 } from 'three'
export interface RoadMarking { id: string; type: 'lane' | 'edge' | 'center' | 'stopLine' | 'crosswalk' | 'arrow'; points: Vector3[]; width: number; color: number; dashed?: boolean }
