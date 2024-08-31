<script>
export default { name: 'sistemas-mant-pedidos-pos-dialogo-precios' }
</script>
<script setup>
import { inject, ref } from "vue"

defineProps({
  lista: { type: Object, default: null }
})

const { set_precios_contado, set_precios_tarjeta } = inject('prov_set_precios')

const show = ref(false)
const opcion = ref(1)
const seleccionados = ref([])

function setPrecios(opc, formas) {
  opcion.value = opc
  seleccionados.value = formas
  show.value = false
}

function guardar() {
  if (opcion.value == 1) set_precios_contado(seleccionados.value)
  if (opcion.value == 2) set_precios_tarjeta(seleccionados.value)
  show.value = false
}

const mostrar = () => show.value = true

defineExpose({ setPrecios, mostrar })
</script>
<template lang="pug">
v-dialog(v-model="show" eager width="350" persistent no-click-animation)
  v-card
    v-toolbar( density="compact" )
      v-toolbar-title.text-h5 Precios
      v-btn(icon="mdi-window-close" @click="show = false")
    v-card-text.px-4.py-3
      v-checkbox(v-for="tipo of lista" :key="tipo.id" v-model="seleccionados" :value="tipo" :label="tipo.nombre")
    v-divider.mt-2
    v-card-actions
      v-btn.mx-auto.px-5(variant="tonal" append-icon="mdi-check" @click="guardar()") Aceptar
</template>