<script setup>
import { ref } from 'vue'
const mostrar_informacion = ref(false)
function show() {
  mostrar_informacion.value = true
}
defineExpose({ show })
</script>

<template lang="pug">
v-dialog(v-model="mostrar_informacion" width="450" scrollable persistent no-click-animation eager)
  v-card
    v-col  
      p.text-h3 Eliminar Fila
    v-col.gap-0.justify-space-around
      v-btn Eliminar
      
      v-btn(@click="mostrar_informacion = false") Cancelar
</template>
