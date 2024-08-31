<script setup>
import { ref, toRaw } from 'vue'

import cmpListaGuiaDetalles from './cmpListaGuiaDetalles.vue'
const emit = defineEmits(['setVista', 'setGuia'])

const filtro = ref('')

const listNroGuias = ref([
  {
    razonSocial: 'TRANSPORTES UNIDOS DE COMERCIO SRLTA',
    direccion: 'AV. Peru 1654 SANTA ANITA',
    fecha: '27/12/2023',
    guiasNro: [
      {
        numero: '504001267',
        productosTotal: 8,
        estado: 'entrega parcial'
      },
      {
        numero: '504001268',
        productosTotal: 11,
        estado: 'entregado'
      }
    ],
    estado: 'entregado'
  },
  {
    razonSocial: 'TRANSPORTES UNIDOS DE..',
    direccion: 'CALLE LOS NARANJOS L...',
    fecha: '25/12/2023',
    guiasNro: [
      {
        numero: '5040018521',
        productosTotal: 5,
        estado: 'entrega parcial'
      },
      {
        numero: '5040018524',
        productosTotal: 2,
        estado: 'entrega parcial'
      }
    ],
    estado: 'entrega parcial'
  },
  {
    razonSocial: 'TRANSPORTES UNIDOS DE..',
    direccion: 'AV. Peru 1654 SANTA ANITA',
    fecha: '23/12/2023',
    guiasNro: [
      {
        numero: '504001001',
        productosTotal: 4,
        estado: 'entregado'
      },
      {
        numero: '504001003',
        productosTotal: 9,
        estado: 'rechazado'
      }
    ],
    estado: 'rechazado'
  },
  {
    razonSocial: 'TRANSPORTES UNIDOS DE..',
    direccion: 'AV. Peru 1654 SANTA ANITA',
    fecha: '21/12/2023',
    guiasNro: [
      {
        numero: '505021655',
        productosTotal: 3,
        estado: 'rechazado'
      },
      {
        numero: '504001656',
        productosTotal: 7,
        estado: 'rechazado'
      }
    ],
    estado: 'entrega parcial'
  }
])

const ordenDespacho = ref({

})

function getDatos(orden) {
  ordenDespacho.value = orden
  // console.log('Llamar datos desde cmpListaGuias', orden);
}

function regresar() {
  emit('setVista', { vista: 0 })
}

function verGuia(item) {
  emit('setVista', { vista: 2 })
  emit('setGuia', { guia: toRaw(item), indice: item.indice })
}

function actualizarGuia(data) {
  let row = listNroGuias.value[data.indice]
  row.guiasNro[data.item].estado = "entregado"

  console.log(listNroGuias.value);
}

defineExpose({ getDatos, actualizarGuia })
</script>

<template lang="pug">
div.gap-10.flex-column
  div.gap-0.justify-space-between.align-center
    span.text-h4.font-weight-bold Orden: {{ordenDespacho.nrOrden}}
    v-btn(icon="mdi-undo mdi-18px" variant="tonal" color="grey" @click="regresar()" size="34")
  div.w230.mr-auto
    v-filtro-input(placeholder='Filtrar Clientes' v-model='filtro')

  v-sheet(class="overflow-x-hidden bg-scroll" max-height="400" )
    v-row(dense)
      v-col.pa-2(v-for="(item, index) in listNroGuias")
        cmpListaGuiaDetalles(:item="item" :indice="index" @verGuia="verGuia" )
</template>