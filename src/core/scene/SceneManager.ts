import * as THREE from 'three'
import { LayerManager } from './LayerManager'
export class SceneManager { scene = new THREE.Scene(); layers = new LayerManager(); raycaster = new THREE.Raycaster(); groundPlane = new THREE.Plane(new THREE.Vector3(0,1,0),0)
  constructor(){ this.scene.add(this.layers.root); const hemi=new THREE.HemisphereLight(0xdbeafe,0x475569,1.4); this.scene.add(hemi); const dir=new THREE.DirectionalLight(0xffffff,1); dir.position.set(50,80,30); this.scene.add(dir); const grid=new THREE.GridHelper(400,80,0x3b82f6,0x334155); this.layers.get('groundLayer').add(grid); const plane=new THREE.Mesh(new THREE.PlaneGeometry(400,400), new THREE.MeshBasicMaterial({color:0x111827, transparent:true, opacity:.25, side:THREE.DoubleSide})); plane.rotation.x=-Math.PI/2; this.layers.get('groundLayer').add(plane) }
  pickGround(ndc:THREE.Vector2,camera:THREE.Camera): THREE.Vector3 | null { this.raycaster.setFromCamera(ndc,camera); const p=new THREE.Vector3(); return this.raycaster.ray.intersectPlane(this.groundPlane,p) ? p : null }
}
