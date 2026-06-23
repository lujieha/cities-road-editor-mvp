let seq = 1
export function uid(prefix = 'id'): string { return `${prefix}_${Date.now().toString(36)}_${seq++}` }
