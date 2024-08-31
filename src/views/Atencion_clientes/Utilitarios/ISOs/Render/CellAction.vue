<script setup>
import { computed } from 'vue'
const props = defineProps(['params'])

const icono_cmp = computed(() => {
  let ext = props.params.data.archivo.split('.').pop().toLowerCase()
  return ext == 'pdf' ? 'mdi-file-pdf-box mdi-20px' : 'mdi-image'
})

const editRow = () => props.params.editar()
const deleteRow = () => props.params.eliminar()
const descargarArchivo = () => props.params.descargar()
</script>
<template lang="pug">
div.gap-10.justify-space-around.mx-auto
  v-btn(icon="mdi-pencil" color="amber" variant="tonal" size="x-small" @click="editRow()") 
  v-btn(icon="mdi-delete" color="red" variant="tonal" size="x-small" @click="deleteRow()")
  v-btn(:icon="icono_cmp" color="blue" variant="tonal" size="x-small" @click="descargarArchivo()") 
</template>
