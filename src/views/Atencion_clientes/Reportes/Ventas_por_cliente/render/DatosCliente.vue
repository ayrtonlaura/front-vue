<script setup>
import { inject } from 'vue'
const selectedClient = inject('selectedClient')
</script>

<template lang="pug">
v-container(fluid)
  v-row(dense)
    v-col(cols="12")
      span.text-h4.font-weight-bold Datos Principales
    v-col(cols="9")
      v-text-field(v-model="selectedClient.codigo" label="Codigo Cliente")
    v-col(cols="3")
      v-text-field(label="Doc. N°")
    v-col(cols="12")
      v-text-field(label="Razon social")
    v-col(cols="12")
      v-text-field(v-model="selectedClient.direccion" label="Direccion")
  v-row(dense)
    v-col(cols="12")
      span.text-h4.font-weight-bold Datos Complementarios
    v-col(cols="4")
      v-text-field(label="Departamento")
    v-col(cols="4")
      v-text-field(v-model="selectedClient.provincia" label="Provincia")
    v-col(cols="4")
      v-text-field(label="Distrito")
    v-col(cols="4")
      v-text-field(v-model="selectedClient.telefono" label="Telefono")
    v-col(cols="4")
      v-text-field(label="Fax")
    v-col(cols="4")
      v-text-field(label="Tipo Cliente")
    v-col(cols="12")
      v-text-field(label="Vendedor")
    v-col(cols="6")
      v-text-field(label="Forma Venta")
    v-col(cols="6")
      v-text-field(label="Tipo Precio")
    v-col(cols="6")
      v-text-field(label="Linea Credito US$")
    v-col(cols="6")
      v-text-field(label="Tipo Percepcion")
    v-col(cols="12")
      v-text-field(label="Comentario")
  v-row(dense)
    v-col(cols="12")
      span.text-h4.font-weight-bold Creado / Modificado
    v-col(cols="6")
      v-text-field(label="Creador")
    v-col(cols="6")
      v-text-field(label="Fec. Creacion")
    v-col(cols="6")
      v-text-field(label="Modificador")
    v-col(cols="6")
      v-text-field(label="Fec. Modifica")

</template>
