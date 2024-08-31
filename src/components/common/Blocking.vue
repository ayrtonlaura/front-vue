<script setup>
import { ref } from 'vue'
import loadingSpinner from '@/components/material/LoadingSpinner.vue'

const loading = ref(false)
const mensaje = ref(null)

function bloquear(texto) {
  mensaje.value = texto
  loading.value = true
}

function desbloquear() {
  loading.value = false
  mensaje.value = ''
}

defineExpose({
  bloquear,
  desbloquear
})
</script>

<template lang="pug">
transition(name='fade')
  div.blocking(v-if='loading')
    loadingSpinner.size
    span.text-h6.text-primary(v-html="mensaje")
</template>

<style lang="scss" scoped>
.size {
  transform: scale(0.8);
}
</style>

<style scoped>
.blocking {
  position: absolute;
  background-color: rgb(255 255 255 / 0.5);
  backdrop-filter: blur(5px);
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  gap: 5px;
  transition: all ease 0.2s;
}
</style>