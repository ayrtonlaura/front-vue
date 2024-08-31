<template lang="pug">
div
  input.ag_input_text_edit(:ref='"input"' v-model='value')
</template>

<style>
.ag_input_text_edit {
  background-color: transparent !important;
  transition: none;
  width: 100%;
  /* text-align: right; */
  border: 0 none;
  box-shadow: none;
  outline: none;
  color: inherit;
}

.ag_input_text_edit::selection {
  color: white;
  background: #0057ad;
}

input.ag_input_text_edit::-webkit-outer-spin-button,
input.ag_input_text_edit::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
/* input.inpinput_editut[type='number'] {
  -moz-appearance: textfield;
} */
</style>

<script>
import { nextTick } from 'vue'

// backspace starts the editor on Windows
const KEY_BACKSPACE = 'Backspace'

export default {
  // template: `<input v-model="value" :ref="'input'" class="my-simple-editor" />`,
  data() {
    return {
      value: null
    }
  },
  methods: {
    getValue() {
      return this.value
    },

    myCustomFunction() {
      return {
        rowIndex: this.params.rowIndex,
        colId: this.params.column.getId()
      }
    },

    getInitialValue() {
      let startValue = this.params.value

      const isBackspace = this.params.eventKey === KEY_BACKSPACE

      if (isBackspace) {
        startValue = ''
      } else if (this.params.charPress) {
        startValue = this.params.charPress
      }

      if (startValue !== null && startValue !== undefined) {
        return startValue
      }

      return ''
    }
  },
  created() {
    this.value = this.getInitialValue()
  },
  mounted() {
    nextTick(() => {
      this.$refs.input.focus()
    })
  }
}
</script>