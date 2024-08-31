<script setup>
import { reactive, ref } from 'vue'
import Almacen from './AlmacenC.vue'

const cmpAlmacen = ref(false)
const proforma = reactive([])
function seleccionarAlmacen() {
  cmpAlmacen.value = true
}

const handleCloseDialog = () => {
  cmpAlmacen.value = false
}
const almacenSelect = ref('')
function almacenEmit(data) {
  almacenSelect.value = data.marca
  cmpAlmacen.value = false
}
</script>
<template lang="pug">
div
  Almacen(v-model="cmpAlmacen" @closeDialog="handleCloseDialog" @almacenEmit="almacenEmit")
  v-card.fill-height.text-primary(prepend-icon="mdi-receipt-text" variant="flat")
    template(v-slot:title)
      span.text-h4 Parte de Entrada
    v-card-text
      v-row
        v-col.gap-5.align-center.flex-row.pa-1(cols="12" align="end")
          v-chip(class="ma-2" color="success" size="small" ) Referencia
          v-text-field( density="compact"  placeholder="CONTENEDOR" )
        v-col.gap-5.align-center.flex-row.pa-1(cols="12" align="end")
          v-chip(class="ma-2" color="success" size="small") Empresa
          v-text-field( density="compact" placeholder="NOMBRE EMPRESA" )
        v-col.gap-5.align-center.flex-row.pa-1(cols="12" align="end")
          v-chip(class="ma-2" color="success" size="small") Proveedor
          v-text-field( density="compact" placeholder="NOMBRE PROVEEDOR" )


        
      v-row.pt-3(align="end")
        

        v-card.d-flex.gap-5.w-100(variant="outlined" color="success")
          v-divider
          v-col.gap-5.align-center.flex-row(cols="4" align="end")
            v-chip(class="ma-2" color="indigo" size="small"  ) ITEMS
            label.text-center.text-success.font-weight-bold 2534
          v-col.gap-5.align-center.flex-row(cols="5" align="end")
            v-chip(class="ma-2" size="small" color="indigo") CANT TOTAL
            label.text-center.text-success.font-weight-bold 2534
          v-divider

        v-col(cols="5")
          v-fecha-single(v-model="proforma.fechaPro" label="Fecha PE")
        v-col(cols="7")
          v-text-field(placeholder="3.796" label="T.C." required)

        v-col(cols="4")
          v-text-field(placeholder="Aduana" label="Aduana")
        v-col(cols="4" )
          v-text-field(placeholder="DUA" label="DUA")
        v-col(cols="4" )
          v-text-field(placeholder="F. DUA" label="F. DUA")
        v-col(cols="10" )
          v-text-field(placeholder="Almacen" v-model="almacenSelect" label="Almacen" readonly required)
        v-col(cols="2" align="center" )
          v-btn(variant="tonal" readonly color="success" icon="mdi-magnify" @click="seleccionarAlmacen()")
    v-divider
    v-card-actions
      v-spacer
      v-btn(color="success" text="Generar Parte de Entrada" variant="tonal" @click="dialog = false")

</template>
