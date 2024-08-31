<script setup>
import {} from 'vue'
const props = defineProps(['params'])

const downloadFile = url => {
  const link = document.createElement('a')
  link.href = url
  link.download = url.split('/').pop()
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleClick = params => {
  const archivo = params.data.archivo
  if (archivo) {
    downloadFile(archivo)
  } else {
    console.error('Archivo no encontrado')
  }
}
</script>
<template lang="pug">
div.gap-10.justify-space-around.mx-auto.w-100
  v-col(cols="12") 
    v-stepper(alt-labels model-value="3" class="elevation-0")
      v-stepper-header
        v-stepper-item(title="PEDIDO"  value="1" color="indigo")
        v-divider
        v-stepper-item(title="PROFORMA"  color="indigo" value="2")
        v-divider
        v-stepper-item(title="INVOICE" value="3" color="indigo")
        v-divider
        v-stepper-item(title="CONTENEDOR" value="4" color="indigo")
        v-divider
        v-stepper-item(title="ENTREGADO" value="5" color="indigo")

        div.pr-6
          v-btn(icon="mdi-microsoft-excel" color="success" variant="tonal" size="x-small" @click="handleClick(params)")
  //- v-col 
  //-   v-btn(:icon="icono_cmp" color="success" variant="tonal" size="x-small" @click="descargarArchivo()") 
</template>
