<script setup>
// import { $moment } from '@/plugins'
import { ref } from 'vue'

const estado = ref(false)
const openDetails = () => {
  estado.value = true
}
</script>
<template lang="pug">
div.w-100
  v-dialog(v-model="estado" max-width="800")
    v-card
      v-card-text
        v-container.w-100(fluid)
          v-row(dense)
            v-col
              v-table(density="compact")
                thead
                  tr
                    th.text-left.text-primary.font-weight-bold Codigo
                    th.text-left.text-primary.font-weight-bold Descripcion
                    th.text-left.text-primary.font-weight-bold Cantidad
                    th.text-left.text-primary.font-weight-bold Precio
                    th.text-left.text-primary.font-weight-bold Prioridad
                tbody
                  tr
                    td TOD1650059
                    td NTCO: 10 16.5 12PR JET TRAX HD JK TL (INDIA)
                    td.text-center 40
                    td 99.8400
                    td NORMAL
                  tr
                    td TOD1650059
                    td NTCO: 10 16.5 12PR JET TRAX HD JK TL (INDIA)
                    td.text-center 40
                    td 99.8400
                    td NORMAL
      template(v-slot:actions)
        v-btn(variant="tonal" class="ms-auto" @click="estado = false") Ok
  
  v-container.w-100(fluid)
    v-row(dense)
      v-col(cols="8")
        v-container.w-100(fluid)
          v-row 
            v-col.pa-0(cols="2")
              div
                span.text-primary.font-weight-bold PEDIDO
            v-col.pa-0(cols="1")
              div
                span  :
            v-col.pa-0(cols="9")
              div
                span   0000000942 (26/06/2024)
            v-col.pa-0(cols="2")
              div
                span.text-primary.font-weight-bold PROVEEDOR
            v-col.pa-0(cols="1")
              div
                span  :
            v-col.pa-0(cols="9")
              div
                span CONTINENTAL C CONTINENTAL TIRE COLOMBIA S.A.S
            v-col.pa-0(cols="2")
              div
                span.text-primary.font-weight-bold MARCA(S)
            v-col.pa-0(cols="1")
              div
                span  :
            v-col.pa-0(cols="9")
              div
                span  KAPSEN
        
        
      v-col.gap-10.align-center(cols="2")

        div
          span.text-primary.font-weight-bold ESTADO
        div
          span  : INVOICE
      v-col.gap-5.justify-center.align-center(cols="2")
        v-btn(variant="tonal" @click="openDetails()") Detalles


</template>
