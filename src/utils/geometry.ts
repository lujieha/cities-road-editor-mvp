import * as THREE from 'three'
export const UP = new THREE.Vector3(0,1,0)
export function v2(p: THREE.Vector3): THREE.Vector2 { return new THREE.Vector2(p.x, p.z) }
export function fromXZ(x:number,z:number,y=0): THREE.Vector3 { return new THREE.Vector3(x,y,z) }
export function distanceXZ(a: THREE.Vector3, b: THREE.Vector3): number { return Math.hypot(a.x-b.x, a.z-b.z) }
export function pathLength(path: THREE.Vector3[]): number { let s=0; for(let i=1;i<path.length;i++) s+=path[i-1].distanceTo(path[i]); return s }
export function tangentAt(path: THREE.Vector3[], atEnd=true): THREE.Vector3 { if(path.length<2) return new THREE.Vector3(1,0,0); const a=atEnd?path[path.length-2]:path[1], b=atEnd?path[path.length-1]:path[0]; return b.clone().sub(a).setY(0).normalize() }
export function leftNormal(dir: THREE.Vector3): THREE.Vector3 { return new THREE.Vector3(-dir.z,0,dir.x).normalize() }
export function closestPointOnSegmentXZ(p: THREE.Vector3, a: THREE.Vector3, b: THREE.Vector3) { const ab=b.clone().sub(a); const denom=ab.x*ab.x+ab.z*ab.z || 1; const t=Math.max(0,Math.min(1,((p.x-a.x)*ab.x+(p.z-a.z)*ab.z)/denom)); return { point:new THREE.Vector3(a.x+ab.x*t, a.y+(b.y-a.y)*t, a.z+ab.z*t), t } }
export function lineIntersectionXZ(a:THREE.Vector3,b:THREE.Vector3,c:THREE.Vector3,d:THREE.Vector3) { const x1=a.x,z1=a.z,x2=b.x,z2=b.z,x3=c.x,z3=c.z,x4=d.x,z4=d.z; const den=(x1-x2)*(z3-z4)-(z1-z2)*(x3-x4); if(Math.abs(den)<1e-7) return null; const t=((x1-x3)*(z3-z4)-(z1-z3)*(x3-x4))/den; const u=((x1-x3)*(z1-z2)-(z1-z3)*(x1-x2))/den; if(t<-1e-6||t>1+1e-6||u<-1e-6||u>1+1e-6) return null; return { point:new THREE.Vector3(x1+(x2-x1)*t, a.y+(b.y-a.y)*t, z1+(z2-z1)*t), t, u } }
export function offsetPolyline(path: THREE.Vector3[], offset: number): THREE.Vector3[] { return path.map((p,i)=>{ const prev=path[Math.max(0,i-1)], next=path[Math.min(path.length-1,i+1)]; const dir=next.clone().sub(prev).setY(0).normalize(); return p.clone().add(leftNormal(dir).multiplyScalar(offset)) }) }
export function buildRibbon(path: THREE.Vector3[], width: number): THREE.Vector3[] { const l=offsetPolyline(path,width/2), r=offsetPolyline(path,-width/2).reverse(); return [...l,...r] }
export function minCurveRadius(path: THREE.Vector3[]): number { if(path.length<3) return Infinity; let min=Infinity; for(let i=1;i<path.length-1;i++){ const a=path[i-1], b=path[i], c=path[i+1]; const A=distanceXZ(b,c), B=distanceXZ(a,c), C=distanceXZ(a,b); const area=Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))/2; if(area<1e-4) continue; min=Math.min(min,(A*B*C)/(4*area)); } return min }
export function slopePercent(path: THREE.Vector3[]): number { const len=pathLength(path); if(len===0) return 0; return Math.abs(path[path.length-1].y-path[0].y)/len*100 }
