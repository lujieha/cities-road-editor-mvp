import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RoadBuildMode, PreviewResult } from '../types/roadBuild'
export const useEditorStore = defineStore('editor', () => {
  const mode = ref<RoadBuildMode>('straight')
  const elevationMode = ref<'ground'|'elevated'|'bridge'|'tunnel'>('ground')
  const roadHeight = ref(0)
  const snapEnabled = ref(true)
  const autoMarkings = ref(true)
  const autoFacilities = ref(true)
  const preview = ref<PreviewResult | null>(null)
  const hoveredSegmentId = ref<string | null>(null)
  const statusText = ref('选择道路类型并点击地面开始建造')
  return { mode, elevationMode, roadHeight, snapEnabled, autoMarkings, autoFacilities, preview, hoveredSegmentId, statusText }
})
