export function parseISODate(iso) {
  if (!iso) return null
  const clean = iso.trim().replace(/\u200B/g, '')
  const withZ = /Z$/.test(clean) ? clean : `${clean}Z`
  const d = new Date(withZ)
  return isNaN(d.getTime()) ? null : d
}

export function formatCLDate(dateObj) {
  if (!dateObj) return ''
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj)
}

export function formatCLTime(dateObj) {
  if (!dateObj) return ''
  return new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(dateObj)
}