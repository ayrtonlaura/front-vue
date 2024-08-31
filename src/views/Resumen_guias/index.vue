<script setup>
import { reactive } from 'vue'
import cmpGuia from './components/guia.vue'

const items = Array.from({ length: 500 }, (k, v) => v + 1)

const busqueda = reactive({
  inicio: null,
  final: null,
  almacen: null,
  movimiento: null,
  referencia: null,
  cliente: null,
  anuladas: null,
})

function recibirMensaje(m) {
  console.log(m);
}
</script>

<template lang="pug">
v-container(fluid)
  v-row(dense)
    v-col
      v-container(fluid)
        v-row(dense)
          v-col(cols="2")
            v-text-field(type="date" label="Inicio" v-model="busqueda.inicio")
          v-col(cols="2")
            v-text-field(type="date" label="Final" v-model="busqueda.inicio")
          v-col
            v-select(label="Almacen" v-model="busqueda.final")
          v-col
            v-select(label="Movimiento" v-model="busqueda.movimiento")
          v-col
            v-select(label="Almacen Referencial" v-model="busqueda.referencia")
          v-col
            v-select(label="Cliente" v-model="busqueda.cliente")
          v-col
            v-checkbox(label="Incluir guias anuladas" v-model="busqueda.anuladas")
          v-col.gap-0
            v-btn.mx-auto(append-icon="mdi-flash mdi-12px" v-model="busqueda.inicio") Buscar

  v-row(dense)
    v-col
      v-virtual-scroll(:items="items" height="calc(100vh - 130px)")
        template(v-slot:default="{ item }")
          cmpGuia(:numero="item" @mensaje="recibirMensaje")
      
</template>