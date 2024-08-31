<script setup>
import { reactive, ref } from 'vue'

const proforma = reactive([])
const destino = ref(['Ayrton', 'Romario', 'Eduardo'])
</script>
<template lang="pug">

v-card.fill-height.text-primary(prepend-icon="mdi-receipt-text" variant="flat" )
  template(v-slot:title)
    p.text-h4.text-primary Datos del Pedido
  v-card-text
    v-row.fill-height(dense align="end")
      v-col.gap-5.align-center.flex-column(cols="4")
        label.text-center.text-success.font-weight-bold 2534
        v-chip(class="ma-2" color="indigo" size="small") Proforma
      v-col.gap-5.align-center.flex-column(cols="4")
        label.text-center.text-success.font-weight-bold 2534
        v-chip(class="ma-2" color="indigo" size="small") Atendidos
      v-col.gap-5.align-center.flex-column(cols="4")
        label.text-center.text-success.font-weight-bold 2534
        v-chip(class="ma-2" color="indigo" size="small") Pendientes
      v-divider
      v-col(cols="12")
        p.py-2.text-primary.text-h5 INVOICE
        v-radio-group.justify-space-around.w-100(inline)
          v-radio.w-50(label="Crear Invoice" color="primary" value="1")
          v-radio.w-50(label="Asignar Invoice" color="primary" value="2")

      v-col(cols="7")
        v-text-field(placeholder="Nro Invoice" label="Invoice" required)
      v-col(cols="5")
        v-fecha-single(v-model="proforma.fechaPro" label="Fecha ETA")
      v-col(cols="7")
        v-text-field(placeholder="Numero B/L" label="B/L")
        
      v-col(cols="5")
        v-fecha-single(v-model="proforma.fechaPro" label="Fecha de B/L")
      v-col(cols="6")
        v-text-field(placeholder="Flete por Contenedor" label="Flete" required)
      v-col(cols="2")
        v-text-field(placeholder="# Cont." label="Contenedor" required)
      v-col(cols="4")
        v-text-field(placeholder="Otros gastos" label="Otros Gastos" required)
      v-col(cols="6")
        v-text-field(placeholder="Importe Invoice" label="Importe" required)

      v-col(cols="6")
        v-select(
          label="Destino"
          :items="destino"
        )
          
  v-card-text.pb-1
      v-btn(class="w-100" color="primary" text="INVOICE" variant="tonal" @click="dialog = false")
  v-card-text.gap-10.justify-center
    div.w-75
      span.text-h5.font-weight-bold EMPRESA:
      span.text-h5 JCH  - 
      span.text-h5.font-weight-bold PEDIDO: 
      span.text-h5 0000000940 
      span.text-h5.font-weight-bold Proforma::
      span.text-h5   HSS20240611J 
      span.text-h5.font-weight-bold Invoice::
      span.text-h5   HSS20240611J-1 [2024-07-23] - 
      span.text-h5.font-weight-bold B/L:
      span.text-h5  QGD0833392 2024-06-24
  v-card-actions
    v-spacer
    v-btn.w-100(color="success" prepend-icon="mdi-content-save-all" text="Guardar" variant="tonal" @click="dialog = false")

</template>
