export type RoadCategory = 'urban' | 'highway' | 'ramp' | 'pedestrian' | 'bike'
export type TurnDirection = 'straight' | 'left' | 'right' | 'uturn'
export type LaneMarkingStyle = 'solid' | 'dashed' | 'doubleSolid' | 'none'
export interface RoadMaterialConfig { surfaceColor: number; edgeColor: number; markingColor: number }
export interface RoadType {
  id: string
  name: string
  category: RoadCategory
  forwardLaneCount: number
  backwardLaneCount: number
  laneWidth: number
  hasMedian: boolean
  medianWidth: number
  hasSidewalk: boolean
  sidewalkWidth: number
  hasGreenBelt: boolean
  greenBeltWidth: number
  speedLimit: number
  allowedTurns: TurnDirection[]
  defaultMarkingStyle: LaneMarkingStyle
  material: RoadMaterialConfig
}
export function getRoadTypeWidth(t: RoadType): number {
  return (t.forwardLaneCount + t.backwardLaneCount) * t.laneWidth + (t.hasMedian ? t.medianWidth : 0) + (t.hasSidewalk ? t.sidewalkWidth * 2 : 0) + (t.hasGreenBelt ? t.greenBeltWidth * 2 : 0)
}
