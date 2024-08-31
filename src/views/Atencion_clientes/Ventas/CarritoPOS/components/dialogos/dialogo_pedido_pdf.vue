<script>
export default { name: 'cmp-dialogo-pedido-pdf' }
</script>
<script setup>
import { ref } from "vue"
import { carrito_ventas_model } from '@/models'
import { $toast } from "@/plugins"

const m_carrito = new carrito_ventas_model()

const show_pdf = ref(false)
const pdf_stream = ref()
const isLoading = ref(false)

async function cargar_pdf(params) {

  $toast.clear()

  isLoading.value = true
  pdf_stream.value = null
  show_pdf.value = true

  let g = await m_carrito.pedido_pdf(params).catch((e) => {
    console.log(e);
    $toast.error(`No se puede mostrar el PDF\n${e.code}: ${e.message}`, { position: 'bottom-center', timeout: 3000 })
    isLoading.value = false
    pdf_stream.value = null
    show_pdf.value = false

  })

  var blob = new Blob([g], { type: 'application/pdf' });

  const reader = new FileReader()
  reader.onload = () => {
    const base64data = reader.result
    pdf_stream.value = base64data
    isLoading.value = false
  }
  reader.onerror = () => {
    console.log('error al generar PDF')
  }
  reader.readAsDataURL(blob)

}

defineExpose({ cargar_pdf })
</script>
<template lang="pug">

v-dialog.p-relative(v-model="show_pdf" height="calc(100vh - 100px)" width="90%" no-click-animation eager persistent)
  div.gap-6.flex-column.text-center.align-center(v-if="isLoading" style="position: absolute; top: 45%; right:0; left: 0")
    v-progress-circular.mb-2(:size="42" :width="2" color="white" indeterminate)
    span.text-h5.text-white Espere un momento
    span.text-h6.text-white Generando formato PDF
  v-btn.px-4(
    style="position: absolute; top: -35px; right:0;"
    prepend-icon="mdi-window-close" color="amber"
    rounded
    @click="show_pdf = false" 
  ) Cerrar
  iframe.iframe_pdf(:src="pdf_stream")
    //- PDF(:src="pdf_stream")
</template>
<style scoped>
.iframe_pdf {
  height: 100%;
  width: 100%;
  border: 0 none;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / .5);
  background-color: #525659;
}
</style>