<script>
export default {
  inheritAttrs: false
}
</script>
<script setup>
// defineProps(['modelValue'])

defineProps({
  // label: {
  //   type: String,
  //   default: "Fecha"
  // },
  disabled: {
    type: Boolean,
    default: false
  },
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  modelValue: {}
})

const emit = defineEmits(['update:modelValue'])

function limpiar() {
  emit('update:modelValue', '')
}
</script>
<template lang="pug">
div.boxFiltro(:class="disabled ? 'disabled': ''")
  input(
    v-bind="$attrs"
    type="search" 
    :value="modelValue"
    :disabled="disabled"
    @input="$emit('update:modelValue', $event.target.value)"
  )
  v-btn(icon="mdi-window-close mdi-12px" size="20" color="grey-lighten-2" @click="limpiar()")
</template>
<style lang="scss" scoped>
.disabled.boxFiltro {
  &:before {
    color: #C5CAD2 !important;
  }

  input {
    border-color: #d0d4db !important;
    border-style: dashed !important;

    &::placeholder {
      color: rgb(187, 187, 187) !important;
    }
  }
}

.boxFiltro {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  position: relative;

  &:before {
    color: #fbbc04;
    content: '\F0232';
    font-family: "Material Design Icons";
    font-size: 16px;
    left: 9px;
    pointer-events: none;
    position: absolute;
    top: 5px;
    z-index: 1;
  }

  input:placeholder-shown+button.v-btn {
    opacity: 0;
    pointer-events: none;
  }

  input {
    content: 'ec8f';
    width: 100%;
    line-height: 32px;
    font-size: 13px;
    border: 1px solid #fbbc04;
    background-color: rgb(255 247 235 / .5);
    border-radius: 20px;
    outline: 0;
    color: black;
    padding-left: 28px;
    padding-right: 24px;
    position: relative;
    transition: .1s;

    &::placeholder {
      color: grey;
    }

    &:focus {
      box-shadow: 0 0 3px 0 #fbbc04;
      outline: none;
    }
  }

  .v-btn {
    position: absolute;
    right: 7px;
    top: 7px;
    padding-left: 1px;
    transition: .1s;
  }
}
</style>