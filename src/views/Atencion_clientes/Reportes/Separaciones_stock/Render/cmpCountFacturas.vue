<script setup>
import {
  inject,
  ref
  // , watch
} from 'vue'

const { totalDocs, totalNombres } = inject('provide_ventas_por_cliente')
// const props = defineProps({
//   closeComponent: {
//     type: Function,
//     default: null
//   },
//   totalRecords: Number, // o el tipo adecuado, como String si es necesario
//   totalJohns: Number
// })

// const emits = defineEmits(['close', 'filtrar'])
const filtrar = ref('')

// watch(
//   () => filtrar.value,
//   a => {
//     emits('filtrar', a)
//   }
// )
</script>
<template lang="pug">
v-col
  v-card(class="popupFactura" )
    v-list
      v-list-item.text-center(:title="totalDocs" subtitle="Documentos")

    v-list 
      v-card(class="car-table")   
        v-row.pa-3
          v-col.d-flex.justify-space-between.pa-2(:class="{ 'opacidad': totalNombres === 0 }") 
            span Facturas 
            span.ui.grey.label {{ totalNombres }}
    //- v-list 
      v-card(class="car-table")   
        v-row.pa-3
          v-col.d-flex.justify-space-between.pa-2(:class="{ 'opacidad': totalJohns === 0 }") 
            span Facturas 
            //- span.ui.grey.label {{ props.totalRecords }}
          v-divider 
          v-col.d-flex.justify-space-between.pa-2(:class="{ 'opacidad': totalJohns === 0 }")  
            span Boleta de venta 
            //- span.ui.grey.label {{ props.totalJohns }}
          v-divider 
          v-col.d-flex.justify-space-between.pa-2(:class="{ 'opacidad': totalJohns === 0 }") 
            span Notas de Credito
            span.ui.grey.label 8

          v-divider 
          v-col.d-flex.justify-space-between.pa-2.opacidad 
            span Notas de Debito
            span.ui.grey.label 0

    //- v-list 
      v-card.d-flex.align-center(class="car-table") 
        v-row.pa-3.ma-0(:class="{ 'opacidad': totalJohns === 0 }")
          v-col.text-center(cols="12") 
            span Sin Guía de remisión
          v-divider.mb-2
          v-col.text-center(cols="12") 
            span.ui.grey.label 0 

        v-row.pa-3.ma-0(:class="{ 'opacidad': totalJohns === 0 }")
          v-col.text-center(cols="12") 
            span Sin Nota de Crédito 
          v-divider.mb-2
          v-col.text-center(cols="12") 
            span.ui.grey.label 0 
    v-list
      v-col
        VFiltroInput(v-model="filtrar" placeholder="Filtrar resultados..." )

</template>
<style lang="scss">
* {
  font-size: 13px;
}

.popupFactura {
  border-left: 2px solid rgb(255, 157, 66) !important;
  padding: 0.833em 1em;
}

.car-table {
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
}

.ui.grey.label {
  background-color: #767676 !important;
  border-color: #767676 !important;
  color: #fff !important;
  padding: 1px 10px;
  border-radius: 0.28571429rem;
  border: 0 solid transparent;
}

.opacidad {
  opacity: 0.5;
}
</style>
