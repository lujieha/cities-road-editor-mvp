import type { Vector3 } from 'three'
export interface TrafficSign { id: string; type: 'stop' | 'yield' | 'speedLimit' | 'direction' | 'noEntry'; position: Vector3; rotation: number; payload?: Record<string, unknown> }
