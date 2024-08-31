<script>
export default { name: 'sistemas-soporte-varios' }
</script>

<script setup>
import { ref, markRaw } from 'vue'

import cmpFTDiferida from './components/cmpFTDiferida'
import cmpCambiarVendedor from './components/cmpCambiarVendedor.vue'
// import cmpGuia01a08 from './components/cmpGuia01a08'


const tabla_lista = ref([

  { id: 'cmpFTDiferida', cmp: markRaw(cmpFTDiferida), descripcion: 'Pasar facturas a diferida', ok: true },
  { id: 'cmpCambiarVendedor', cmp: markRaw(cmpCambiarVendedor), descripcion: 'Cambiar vendedor', ok: true },

  { id: 'cmp', descripcion: 'Producto flag: Vehiculo' },

  { id: 'cmp', descripcion: 'Añadir placa a la factura' },

  { id: 'cmp', descripcion: 'Cambiar facturas a obsequio (Eliminar cartera)' },

  { id: 'cmp', descripcion: 'Replicar códigos de JCH a la base de EVOCARS' },


  // { id: 'cmpGuia01a08', cmp: markRaw(cmpGuia01a08), descripcion: 'Pasar guía de mov 01 a 08', ok: true },
  // { id: 'cmp', descripcion: 'Amarrar guías de ventas a factura diferida' },
  // { id: 'cmp', descripcion: 'Anular guía una vez dada de baja la factura (Realizar pruebas)' },
])

const component = ref(null)
const selected = (sel) => (component.value = sel)

</script>

<template lang="pug">
v-container.pa-2(fluid)
  v-row(dense)
    v-col(cols="2")
      div.text-h6.pa-2 Opciones de soporte
      v-list.pa-1.pb-0.bg-main.border.rounded(nav density="compact" color="primary" mandatory)
        v-list-item.bg-boton(
          v-for="item of tabla_lista" :key="item.id" :value="item" :disabled="!item.ok" 
          @click="selected(item.cmp)"
          )
          div.gap-8.align-center
            i.mdi(:class=" component === item.cmp ? 'mdi-record-circle-outline' : 'mdi-circle-small'")
            span.text-h6(style="line-height: 16px !important;") {{ item.descripcion }}
    v-col(cols="10")
      component.boton.py-1.px-2.rounded(:is="component")
</template>