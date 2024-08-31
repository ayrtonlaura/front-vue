<script setup>
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
div.gap-10.mx-auto
  v-col
    div
      v-btn(icon="mdi-microsoft-excel" color="success" @click="handleClick(params)" variant="tonal" size="x-small")
</template>
