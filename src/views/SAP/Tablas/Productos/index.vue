<script>
export default { name: 'sap-tablas-productos' }
</script>
<script setup>
import { reactive, ref } from "vue"
import { SAP_Producto_model } from '@/models/SAP'
const sap_m_producto = new SAP_Producto_model()

const productos = ref()
async function getProductos() {
  productos.value = null
  productos.value = await sap_m_producto.listar()
}

const form = reactive({
  codigo: null,
  descripcion: null
})
const response = ref()
async function editProducto() {
  response.value = null
  response.value = await sap_m_producto.editar(form)
}
const isLoading = ref(false)
const response2 = ref()
async function crearProducto() {
  isLoading.value = true
  response2.value = null
  response2.value = await sap_m_producto.crear({})
  isLoading.value = false
}
</script>
<template lang="pug">
v-container
  v-row(dense)
    v-col(cols="6")
      div.gap-10.align-center
        span.text-h6 Listar productos 
        v-btn(@click="getProductos()") Listar

      div.lista
        pre.text-caption.text-selected {{ productos }}
    v-col(cols="6")
      div.gap-10.align-center
        span.text-h5 Actualizar producto
      div.gap-10
        v-text-field(v-model="form.codigo" label="Codigo")
        v-text-field(v-model="form.descripcion" label="Descripcion")
        v-btn(@click="editProducto()") Guardar
      div.mt-2.border.pa-2.rounded
        pre.text-caption {{ response }}

      v-divider.my-4

      div.gap-10.align-center
        span.text-h5 Crear producto
      div.gap-10
        //- v-text-field(v-model="form.codigo" label="Codigo")
        //- v-text-field(v-model="form.descripcion" label="Descripcion")
        v-btn(:loading="isLoading" @click="crearProducto()") Crear
      div.mt-2.border.pa-2.rounded
        pre.text-caption {{ response2 }}
</template>
<style scoped>
.lista {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.text-selected {
  user-select: text;
}
</style>