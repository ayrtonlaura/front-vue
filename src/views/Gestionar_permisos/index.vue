<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const base = route.params.base
const agencia = route.params.agencia
const usuario = route.params.usuario

</script>
<template lang="pug">
v-container.py-1
  v-row(dense)
    v-col
      span.text-h5 Opciones
      v-checkbox(label="Activo")
      span.text-h6 {{ base }}
      span.text-h6 {{ agencia }}
      v-text-field(label="Usuario" v-model="usuario" readonly)
      v-text-field(label="Clave" v-model="usuario" readonly)
      v-checkbox(label="Descuento por pedido")

      v-checkbox(label="Stock rápido - Descargar excel")
      //- v-checkbox(label="Descuento por pedido")
      //- v-checkbox(label="Descuento por pedido")

      v-btn(append-icon="mdi-content-save") Guardar opciones
</template>