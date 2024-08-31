<script setup>
import { ref } from 'vue'

const emit = defineEmits(['setVista', 'setOrden'])

const listNroOrden = ref([
  {
    nrOrden: ' 31478521',
    fecha: '29/12/2023',
    notaDespacho: 'Nota Orden Despacho'
  },
  {
    nrOrden: ' 31478488',
    fecha: '21/12/2023',
    notaDespacho: 'Nota Orden Despacho'
  },
  {
    nrOrden: ' 31478329',
    fecha: '22/12/2023',
    notaDespacho: 'Nota Orden Despacho'
  },
  {
    nrOrden: ' 31478521',
    fecha: '26/12/2023',
    notaDespacho: 'Nota Orden Despacho'
  }
])

const filtro = ref('')

function mostrar(orden) {
  emit('setVista', { vista: 1 })
  emit('setOrden', orden)
}

</script>

<template lang="pug">
div.gap-10.flex-column
  div.gap-0.justify-space-between.align-center
    span.text-h4.font-weight-bold Chofer: 0001
    v-btn(color="blue" variant="tonal"  icon="mdi-fullscreen mdi-20px" size="34") 

  div.gap-10.justify-space-between.align-center
    div.w230.mr-auto
      v-filtro-input(placeholder='Filtrar Ordenes' v-model='filtro')
    v-btn(color="green" variant="tonal"  icon="mdi-refresh mdi-20px" size="34") 

  v-sheet.border.rounded.overflow-x-hidden.bg-scroll(max-height="calc(100vh - 200px)")
    v-row(dense align="center")
      template(v-for="item in listNroOrden")
        v-col.pa-1(cols="9")
          v-card.pa-2(density="compact" flat)
            div.gap-5
              div.gap-5.justify-space-between.align-center.text-h4
                span Orden # 
                span.font-weight-bold.text-primary {{ item.nrOrden }}
            div
              span.text-h5 {{ item.fecha }}
            div.gap-5.justify-space-between.align-center
              span.text-h5 {{ item.notaDespacho }}
        v-col.pa-1(cols="3")
          v-btn(color="blue" @click="mostrar(item)") Mostrar
        v-divider
</template>