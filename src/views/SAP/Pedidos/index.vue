<script>
export default { name: 'sap-orden-venta' }
</script>
<script setup>
import { ref } from "vue"
import { SAP_OrdenVenta_model } from '@/models/SAP'

const m_orden = new SAP_OrdenVenta_model()
// const orden = reactive({
//   ruc: '20318171701'
// })
const isLoading = ref(false)
const result = ref()
async function crearOV() {
  isLoading.value = true
  result.value = null
  result.value = await m_orden.crear().finally(() => {
    isLoading.value = false
  })
}

const isLoading2 = ref(false)
const result2 = ref()
async function modificarOV() {
  isLoading2.value = true
  result2.value = null
  result2.value = await m_orden.modificar().finally(() => {
    isLoading2.value = false
  })
}

const isLoading3 = ref(false)
const result3 = ref()
async function modificarOVodbc() {
  isLoading3.value = true
  result3.value = null
  result3.value = await m_orden.modificar_odbc().finally(() => {
    isLoading3.value = false
  })
}
</script>
<template lang="pug">
v-container
  v-row(dense)
    v-col
      v-btn(:loading="isLoading" @click="crearOV()") Crear orden de Venta (DI)
      pre.mt-2.pa-3.border.rounded {{ result }}
  v-row(dense)
    v-col
      v-btn(:loading="isLoading2" @click="modificarOV()") Modificar orden de Venta (DI)
      pre.mt-2.pa-3.border.rounded {{ result2 }}

  v-divider.my-4

  v-row(dense)
    v-col
      v-btn(:loading="isLoading3" @click="modificarOVodbc()") Modificar orden de Venta (ODBC)
      pre.mt-2.pa-3.border.rounded {{ result3 }}
      
</template>