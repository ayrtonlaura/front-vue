<script setup>
import { ref } from 'vue'
const emit = defineEmits(['setVista'])

const productos = ref([
  {
    descripcion: '185/70 R15 TR928 TRIANGLE TL THAILANDIA',
    cantidad: 4
  },
  {
    descripcion: '275/70 R225.8 101/105T WESTLAKE TL INDONESIA',
    cantidad: 8
  },
  {
    descripcion: '185/70 R15 TR928 TRIANGLE TL THAILANDIA',
    cantidad: 5
  },
  {
    descripcion: '275/70 R225.8 101/105T WESTLAKE TL INDONESIA',
    cantidad: 22
  },
  {
    descripcion: '185/70 R15 TR928 TRIANGLE TL THAILANDIA',
    cantidad: 14
  },
  {
    descripcion: '185/70 R15 TR928 TRIANGLE TL THAILANDIA',
    cantidad: 14
  },
  {
    descripcion: '185/70 R15 TR928 TRIANGLE TL THAILANDIA',
    cantidad: 14
  }
])

function regresar() {
  emit('setVista', { vista: 2 })
}

function verInfoProducto() { }
</script>

<template lang="pug">
div.pa-2.gap-7.flex-column

  div.gap-10.justify-space-between.align-center
    div.gap-2.flex-column
      span.text-h4.font-weight-bold 5040012333
      span.text-h6 28/12/2023
    div.gap-0.justify-space-between.align-center
      span.text-h6.font-weight-bold Orden: 0001

  v-sheet.border.rounded(class="overflow-y-auto bg-scroll" max-height="380" ) 
    v-table(density="compact")
      thead
        tr.text-h6.font-weight-bold
          th(class="text-left") Descripcion
          th(class="text-left") Cantidad
      tbody
        tr.text-h6(v-for="product in productos")
          td {{ product.descripcion }}
          td.text-center {{ product.cantidad }}

  div.gap-10.justify-end
    span.border.py-1.px-3.rounded-lg.align-center
      span.text-h6 Productos:
      span.text-h4.pl-1 65
    //- span.text-h5.font-weight-bold.border.pa-2.rounded-lg Productos: 65

  //- div.gap-10.justify-space-between.align-center
  //-   v-textarea(label="Observaciones" placeholder="Observaciones ...")
  div.gap-0.mt-2
    v-btn.mx-auto(prepend-icon="mdi-undo" variant="tonal" @click="regresar()") Regresar

</template>