import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { createDefaultRoadTypes } from '../core/road/RoadTypeFactory'
export const useRoadTypeStore = defineStore('roadType', () => {
  const roadTypes = ref(createDefaultRoadTypes())
  const selectedRoadTypeId = ref('two_lane')
  const selectedRoadType = computed(() => roadTypes.value.find(r => r.id === selectedRoadTypeId.value) ?? roadTypes.value[0])
  return { roadTypes, selectedRoadTypeId, selectedRoadType }
})
