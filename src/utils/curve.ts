import * as THREE from 'three'
export function sampleLine(a: THREE.Vector3, b: THREE.Vector3, n=8): THREE.Vector3[] { return Array.from({length:n},(_,i)=>a.clone().lerp(b,i/(n-1))) }
export function sampleQuadraticBezier(a: THREE.Vector3, c: THREE.Vector3, b: THREE.Vector3, n=32): THREE.Vector3[] { const curve = new THREE.QuadraticBezierCurve3(a,c,b); return curve.getPoints(n-1) }
export function sampleCatmullRom(points: THREE.Vector3[], n=16): THREE.Vector3[] { if(points.length<2) return points; return new THREE.CatmullRomCurve3(points,false,'catmullrom',0.35).getPoints(Math.max(n,points.length*8)) }
