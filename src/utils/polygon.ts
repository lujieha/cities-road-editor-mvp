import * as THREE from 'three'
export function polygonShape(points: THREE.Vector3[]): THREE.Shape { const s=new THREE.Shape(); if(!points.length) return s; s.moveTo(points[0].x, points[0].z); for(let i=1;i<points.length;i++) s.lineTo(points[i].x, points[i].z); s.closePath(); return s }
export function polygonAreaXZ(points: THREE.Vector3[]): number { let a=0; for(let i=0;i<points.length;i++){ const p=points[i], q=points[(i+1)%points.length]; a += p.x*q.z-q.x*p.z } return a/2 }
