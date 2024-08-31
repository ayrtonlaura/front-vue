<script setup>
const props = defineProps({
  archivo: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeToast'])

const abrir = async () => {
  const invoke = window.__TAURI__.invoke
  await invoke('open_file', { filepath: props.archivo })
  emit('closeToast')
}
</script>

<template lang="pug">
transition(name="fade")
  div.toast(v-show="show")
    v-icon(icon="mdi-download" size="18" @click='abrir')
    div.wrap(@click="abrir")
      span Ver archivo
      div.archivo {{ archivo }}
    v-btn(color="white" icon="mdi-window-close" variant="text" size="x-small" @click="emit('closeToast')")
</template>

<style scoped lang="scss">
.toast {
  position: absolute;
  right: 15px;
  top: 42px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.1);
  background-color: #116611;
  backdrop-filter: blur(5px);
  padding: 6px 10px;
  border-radius: 6px;
  z-index: 9999 !important;

  display: flex;
  gap: 10px;
  align-items: center;
  color: #fff;
  transition: opacity ease 0.2s;

  &:hover {
    opacity: 0.9;
  }

  .v-icon {
    cursor: pointer;
  }

  div.wrap {
    cursor: pointer;
    line-height: 15px;
  }

  span {
    font-size: 12px;
  }

  div.archivo {
    opacity: 0.8;
    width: 200px;
    font-size: 11px;
    overflow: hidden;
    white-space: nowrap;
    direction: rtl;
    text-overflow: ellipsis;
  }
}
</style>
