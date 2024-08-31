<template lang="pug">
div
  input.ag_input_price_edit(:ref='"input"' @keydown='onKeyDown($event)' type='number' v-model='value')
  //- input(:ref='"input"' type='number' v-model='value')
</template>

<style>
.ag_input_price_edit {
  background-color: transparent !important;
  transition: none;
  width: 100%;
  text-align: right;
  border: 0 none;
  box-shadow: none;
  outline: none;
  color: inherit;
}

.ag_input_price_edit::selection {
  color: white;
  background: #0057ad;
}

input.ag_input_price_edit::-webkit-outer-spin-button,
input.ag_input_price_edit::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
/* input.inpinput_editut[type='number'] {
  -moz-appearance: textfield;
} */
</style>

<script>
const KEY_ESCAPE = 27
const KEY_BACKSPACE = 8
const KEY_DELETE = 46
const KEY_F2 = 113
const KEY_ENTER = 13
const KEY_TAB = 9

export default {
  data() {
    return {
      value: '',
      cancelBeforeStart: true,
      highlightAllOnFocus: true
    }
  },
  methods: {
    getValue() {
      return this.value
    },

    isCancelBeforeStart() {
      return this.cancelBeforeStart
    },

    setInitialState(params) {
      let startValue
      let highlightAllOnFocus = true

      if (params.keyPress === KEY_BACKSPACE || params.keyPress === KEY_DELETE) {
        // if backspace or delete pressed, we clear the cell
        startValue = ''
      } else if (params.charPress) {
        // if a letter was pressed, we start with the letter
        startValue = params.charPress
        highlightAllOnFocus = false
      } else {
        // otherwise we start with the current value
        startValue = params.value
        if (params.keyPress === KEY_F2) {
          highlightAllOnFocus = false
        }
      }

      // console.log(startValue)

      // this.value = params.value
      this.value = parseFloat(startValue) // NOTA: se añadio el parseFloat para que no muestre .000000 por el SQL

      this.highlightAllOnFocus = highlightAllOnFocus
    },

    //! will reject the number if it greater than 1,000,000
    //! not very practical, but demonstrates the method.
    isCancelAfterEnd() {
      // return this.value > 1000000
      return false
    },

    onKeyDown(event) {
      if (this.isKeyEscapePressed(event)) return

      if (this.isLeftOrRight(event) || this.deleteOrBackspace(event)) {
        event.stopPropagation()
        return
      }

      if (!this.finishedEditingPressed(event) && !this.isKeyPressedNumeric(event)) {
        if (event.preventDefault) event.preventDefault()
      }
    },

    getCharCodeFromEvent(event) {
      event = event || window.event
      return typeof event.which === 'undefined' ? event.keyCode : event.which
    },

    isCharNumeric(charStr) {
      var regexp = /^[0-9]*\.?[0-9]*$/
      return regexp.test(charStr)
    },

    isKeyPressedNumeric(event) {
      // const charCode = this.getCharCodeFromEvent(event)
      // const charStr = String.fromCharCode(charCode)
      // return this.isCharNumeric(charStr)
      return this.isCharNumeric(event.key)
    },

    isKeyEscapePressed(event) {
      const charCode = this.getCharCodeFromEvent(event)
      return charCode === KEY_ESCAPE
    },

    finishedEditingPressed(event) {
      const charCode = this.getCharCodeFromEvent(event)
      return charCode === KEY_ENTER || charCode === KEY_TAB
    },

    deleteOrBackspace(event) {
      return [KEY_DELETE, KEY_BACKSPACE].indexOf(this.getCharCodeFromEvent(event)) > -1
    },

    isLeftOrRight(event) {
      return [37, 39].indexOf(this.getCharCodeFromEvent(event)) > -1
    }
  },

  created() {
    this.setInitialState(this.params)

    // only start edit if key pressed is a number, not a letter
    // console.log('a1234567890'.indexOf(this.params.charPress))
    this.cancelBeforeStart = this.params.charPress && '1234567890-'.indexOf(this.params.charPress) < 0
    // this.cancelBeforeStart = false
  },
  mounted() {
    this.$nextTick(() => {
      // need to check if the input reference is still valid - if the edit was cancelled before it started there
      // wont be an editor component anymore
      if (this.$refs.input) {
        this.$refs.input.focus()
        if (this.highlightAllOnFocus) {
          this.$refs.input.select()

          this.highlightAllOnFocus = false
        } else {
          // when we started editing, we want the carot at the end, not the start.
          // this comes into play in two scenarios: a) when user hits F2 and b)
          // when user hits a printable character, then on IE (and only IE) the carot
          // was placed after the first character, thus 'apply' would end up as 'pplea'
          const length = this.$refs.input.value ? this.$refs.input.value.length : 0
          if (length > 0) {
            this.$refs.input.type = 'text'
            this.$refs.input.setSelectionRange(length, length)
            this.$refs.input.type = 'number'
          }
        }

        this.$refs.input.focus()
      }
    })
  }
}
</script>
