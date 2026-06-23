<template><div class="toolbar-block"><div class="panel-title">道路工具</div><el-button-group><el-button @click="demo">Demo 数据</el-button><el-button @click="exportJson">导出 JSON</el-button><el-button @click="openImport">导入</el-button></el-button-group><input ref="file" type="file" accept="application/json" hidden @change="onFile" /></div></template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoadNetworkStore } from '../stores/roadNetworkStore'
import { createDemoNetwork } from '../demo/createDemoNetwork'
const store=useRoadNetworkStore(); const file=ref<HTMLInputElement|null>(null)
function demo(){ const net=createDemoNetwork(); store.restore(net) }
function exportJson(){ const blob=new Blob([store.exportJson()],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='road-network.json'; a.click(); URL.revokeObjectURL(a.href) }
function openImport(){ file.value?.click() }
async function onFile(e:Event){ const f=(e.target as HTMLInputElement).files?.[0]; if(f) store.importJson(await f.text()) }
</script>
