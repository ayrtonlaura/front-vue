export default function highlight(texto, filtro) {
  if (!filtro) return texto
  const keywords = escape(filtro.trim()).split(/\s/)
  const pattern = new RegExp(`(${keywords.join('|')})`, 'ig')
  if (!texto) return ''
  return String(texto).replace(pattern, match => `<mark class="highlight-text">${match}</mark>`)
}

function escape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
