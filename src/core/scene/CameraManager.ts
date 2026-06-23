import * as THREE from 'three'
export class CameraManager { camera: THREE.PerspectiveCamera; constructor(){ this.camera = new THREE.PerspectiveCamera(55,1,0.1,5000); this.camera.position.set(80,85,80); this.camera.lookAt(0,0,0) } resize(w:number,h:number){ this.camera.aspect=w/h; this.camera.updateProjectionMatrix() } }
