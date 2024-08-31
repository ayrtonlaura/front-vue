<script setup>
import { ref, inject, onMounted, computed } from 'vue'
import EstadoCuenta from './EstadoCuenta.vue'
import DireccionEntrega from './DireccionEntrega.vue'
import AgenciaTransporte from './AgenciaTransporte.vue'
import ContactosC from './ContactosC.vue'
import DatosCliente from './DatosCliente.vue'
const tab = ref('option-1')

const changeTab = inject('changeTab')
onMounted(() => {
  changeTab.value = newTab => {
    tab.value = newTab
  }
})

const computedTitle = computed(() => {
  if (tab.value === 'option-2') return 'Contactos'
  else if (tab.value === 'option-3') return 'Agencia de Transporte'
  else if (tab.value === 'option-4') return 'Direccion de Entrega'
  else if (tab.value === 'option-5') return 'Estado de Cuenta'
  else return 'Consulta del Cliente'
})
</script>

<template lang="pug">
div
  v-card(flat)
    v-toolbar.text-white(color="primary" variant="tonal" :title="computedTitle")

    .d-flex.flex-row
      v-window.w-100(v-model="tab")
        v-window-item(value="option-1" eager)
          v-card(flat)
            v-card-text
              DatosCliente

        v-window-item(value="option-2" eager)
          v-card(flat)
            v-card-text
              ContactosC
              
        v-window-item(value="option-3" eager)
          v-card(flat)
            v-card-text
              AgenciaTransporte
        v-window-item(value="option-4" eager)
          v-card 
            v-card-text
              DireccionEntrega

        v-window-item(value="option-5" eager)
          v-card(flat)
            v-card-text
              EstadoCuenta

      v-tabs(v-model="tab" color="primary" direction="vertical" )
        v-tab(prepend-icon="mdi-account" value="option-1") Datos del Cliente
        v-tab(prepend-icon="mdi-account-box" value="option-2") Contactos
        v-tab(prepend-icon="mdi-truck" value="option-3") Agencia de Transporte
        v-tab(prepend-icon="mdi-map-marker" value="option-4") Direccion de entrega
        v-tab(prepend-icon="mdi-state-machine" value="option-5" eager) Estado de Cuenta

</template>
