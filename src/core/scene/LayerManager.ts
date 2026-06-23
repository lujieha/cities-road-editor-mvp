import * as THREE from 'three'
export type LayerName = 'groundLayer'|'roadSurfaceLayer'|'laneLayer'|'markingLayer'|'intersectionLayer'|'signLayer'|'facilityLayer'|'previewLayer'|'helperLayer'|'selectionLayer'
export class LayerManager {
  readonly root = new THREE.Group()
  readonly layers = new Map<LayerName, THREE.Group>()
  constructor(){ const names:LayerName[]=['groundLayer','roadSurfaceLayer','laneLayer','markingLayer','intersectionLayer','signLayer','facilityLayer','previewLayer','helperLayer','selectionLayer']; for(const n of names){ const g=new THREE.Group(); g.name=n; this.layers.set(n,g); this.root.add(g) } }
  get(name:LayerName){ return this.layers.get(name)! }
  clear(name:LayerName){ const g=this.get(name); while(g.children.length){ const o=g.children.pop()!; o.traverse(c=>{ const m=(c as THREE.Mesh).material as any; const geo=(c as THREE.Mesh).geometry as any; if(m?.dispose) m.dispose(); if(geo?.dispose) geo.dispose() }) } }
}
