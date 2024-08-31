<script>
export default { name: 'x-atencion-clientes-despachos-ruta-asignada' }
</script>
<script setup>
import { computed, onMounted, ref, toRaw } from "vue";
import { $moment } from "@/plugins";

// TODO: datos desde la base de datos
const ordenes = ref([])
const isLoading = ref(false)
const filtro = ref('')

const cmp_ordenes = computed(() => {
  let q = filtro.value, data = toRaw(ordenes.value)
  if (q == "") return data
  return data.filter(item => String(item.id).includes(q))
})

async function loadOrdenes() {
  isLoading.value = true
  ordenes.value = []
  await new Promise(r => setTimeout(r, 500));
  ordenes.value = [
    { id: 1, fecha: '2024-03-01', guias: 5, atendidos: 1 },
    { id: 2, fecha: '2024-03-11', guias: 2, atendidos: 1 },
    { id: 3, fecha: '2024-03-12', guias: 4, atendidos: 3 },
    { id: 4, fecha: '2024-03-14', guias: 1, atendidos: 1 },
    { id: 5, fecha: '2024-03-14', guias: 8, atendidos: 8 },
  ]
  isLoading.value = false
}

onMounted(() => {
  loadOrdenes()
})

</script>
<template lang="pug">
div.pa-3

  div.gap-10.align-center
    div.gap-3.flex-column
      span.text-h5 Pedro Perez
      span.text-h6 Chofer
    v-spacer
    v-btn(icon="mdi-sync mdi-20px" @click="loadOrdenes")

  v-text-field.my-2(v-model="filtro" placeholder="Fitlrar" variant="outlined")

  div.gap-10.flex-column.align-center.text-center.pa-3(v-if="isLoading") 
    v-progress-circular(color="primary" indeterminate :size="30" width="2")
    span.text-h6 Extrayendo informacion..

  v-list(style="max-height: calc(100vh - 220px)")
    v-list-item.bg-boton.border.mb-1.rounded(v-for="orden of cmp_ordenes" :key="orden.id")
      div.gap-5
        div.gap-5.flex-column
          span.text-h5.font-weight-bold Orden: {{ orden.id }}
          span.text-h6 {{ $moment(orden.fecha).format('D-MMM-Y') }}
        v-spacer
        div.gap-5.flex-column
          span.text-h6 Guias: {{ orden.guias }}
          span.text-h6 Atendidas: {{ orden.atendidos }}

      template(#append)
        v-btn.ml-4(
          :to="{ name: 'atencion-clientes-despacho-ruta-orden', params: { id: orden.id } }"
          :disabled="orden.guias == orden.atendidos"
        ) Aceptar

</template>