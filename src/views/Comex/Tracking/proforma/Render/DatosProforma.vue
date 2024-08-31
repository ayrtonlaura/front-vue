<script setup>
import { reactive } from 'vue'

const proforma = reactive([])
</script>
<template lang="pug">

v-card.fill-height.text-primary(prepend-icon="mdi-account-plus" variant="flat")
  template(v-slot:title)
    span.text-h4 Datos del Pedido
  v-card-text
    v-row.fill-height(dense)
      v-col.fill-height(cols="12")
        v-text-field(label="PEDIDO" required)
      v-col.pb-2(cols="12")
        v-text-field( label="EMPRESA")
      v-col.gap-5.align-center.flex-column(cols="4")
        label.text-center.text-success.font-weight-bold 2534
        v-chip(class="ma-2" color="indigo" size="small") Pedidos
      v-col.gap-5.align-center.flex-column(cols="4")
        label.text-center.text-success.font-weight-bold 2534
        v-chip(class="ma-2" color="indigo" size="small") Atendidos
      v-col.gap-5.align-center.flex-column(cols="4")
        label.text-center.text-success.font-weight-bold 2534
        v-chip(class="ma-2" color="indigo" size="small") Pendientes
      v-divider
      v-col(cols="7")
        v-radio-group.justify-space-around.w-100(inline)
          v-radio.w-50(label="Crear" color="primary" value="1")
          v-radio.w-50(label="Asignar" color="primary" value="2")
      v-col.pt-2(cols="5")
        v-checkbox(label="Fabricación")
      v-col(cols="12")
        v-text-field(placeholder="Nro Proforma" label="PROFORMA" required)
      v-col(cols="12")
        v-text-field(placeholder="Pais de origen" label="ORIGEN")
        
      v-col(cols="6") 
        v-fecha-single(v-model="proforma.fechaPro" label="Fecha Proforma" )
        //- v-date-input
      v-col(cols="6") 
        v-fecha-single(v-model="proforma.fechaRecep" label="Fecha Recepcion" )
  v-divider
  v-card-text.pb-1
      v-btn.w-100(color="primary" text="PROFORMAS" variant="tonal" @click="dialog = false")
  v-card-text.gap-10.justify-center
    div.w-75
      span.text-h5.font-weight-bold EMPRESA:
      span.text-h5 JCH  - 
      span.text-h5.font-weight-bold PEDIDO: 
      span.text-h5 0000000940 
      span.text-h5.font-weight-bold FECPED:
      span.text-h5  2024-06-26
      span.text-h5.font-weight-bold PROFORMA:
      span.text-h5  HSS20240611J - 
      span.text-h5.font-weight-bold FECPRO:
      span.text-h5 2024-06-11
  v-card-actions
    v-btn.w-100(color="success" prepend-icon="mdi-content-save-all" text="GUARDAR" variant="tonal" @click="dialog = false")

</template>
