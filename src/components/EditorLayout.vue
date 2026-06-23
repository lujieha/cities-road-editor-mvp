<template>
  <div class="editor-shell">
    <aside class="left-panel">
      <RoadToolbar />
      <BuildModePanel />
      <RoadTypePanel />
      <LayerPanel />
      <PropertyPanel />
    </aside>
    <main class="viewport-wrap"><ThreeViewport /><StatusOverlay /></main>
  </div>
</template>
<script setup lang="ts">
import ThreeViewport from './ThreeViewport.vue'
import RoadToolbar from './RoadToolbar.vue'
import RoadTypePanel from './RoadTypePanel.vue'
import BuildModePanel from './BuildModePanel.vue'
import StatusOverlay from './StatusOverlay.vue'
import LayerPanel from './LayerPanel.vue'
import PropertyPanel from './PropertyPanel.vue'
</script>
