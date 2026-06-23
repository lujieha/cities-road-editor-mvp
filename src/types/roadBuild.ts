import type { Vector3 } from 'three'
import type { RoadMarking } from './marking'
export type RoadBuildMode = 'straight' | 'curve' | 'freeform' | 'upgrade' | 'delete' | 'move' | 'nodeEdit'
export interface SnapResult { type: 'node' | 'segment' | 'grid' | 'angle' | 'none'; targetId?: string; position: Vector3; tangent?: Vector3; distance: number; canConnect: boolean; willCreateIntersection: boolean; splitSegmentId?: string }
export interface ConflictResult { type: 'self' | 'segment' | 'facility' | 'angle' | 'slope' | 'radius'; targetId?: string; message: string; blocking: boolean }
export interface IntersectionPreview { nodePosition: Vector3; boundary: Vector3[]; connectedSegmentIds: string[] }
export interface PreviewResult { path: Vector3[]; roadPolygon: Vector3[]; lanePolygons: Vector3[][]; markingPreview: RoadMarking[]; startSnap?: SnapResult; endSnap?: SnapResult; intersectionPreview?: IntersectionPreview; conflictResults: ConflictResult[]; buildable: boolean; reason?: string; cost?: number; length: number; slope: number; minRadius: number }
export interface BuildSession { mode: RoadBuildMode; points: Vector3[]; controlPoint?: Vector3; isActive: boolean }
