export default {
  updated: function (el) {
    el.addEventListener(
      'input',
      async e => {
        let el = e.target
        let start = el.selectionStart
        let end = el.selectionEnd
        el.value = el.value.toUpperCase()
        el.setSelectionRange(start, end)
      },
      true
    )
  }
}
