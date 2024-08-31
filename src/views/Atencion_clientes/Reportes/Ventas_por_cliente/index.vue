<script>
export default { name: 'atencion-reportes-ventas-por-cliente' }
</script>
<script setup>
import { ref, provide, reactive, computed, watchEffect } from 'vue'

import { useTheme } from 'vuetify'

import ConsultaClientes from './render/ConsultaClientes.vue'
import DetalleCliente from './render/DetalleCliente.vue'

const rowData = ref([])
const filtro = ref('')

const allData = [
  {
    RUC_CLI: '1234567891',
    NombreCliente: 'Cliente 1',
    codigo: '11000',
    direccion: 'C. Montes Urales 445',
    provincia: 'Distrito Federal',
    telefono: '5553428400'
  },
  {
    RUC_CLI: '987654321',
    NombreCliente: 'Cliente 2 ton romario eduardo laura cajaton romario eduardo laura cajaton romario eduardo laura caja',
    codigo: '94043',
    direccion: '1600 Amphitheatre Parkway',
    provincia: 'CA',
    telefono: '6019521325'
  },
  {
    RUC_CLI: '456123789',
    NombreCliente: 'ayrton romario c',
    codigo: '80636',
    direccion: 'Erika-Mann-Straße 33',
    provincia: 'Bayer',
    telefono: '030303986300'
  }
]

const columnDefs = [
  {
    headerName: 'RUC_CLI',
    flex: 1,
    field: 'RUC_CLI',
    wrapText: true,
    autoHeight: true,
    cellRenderer: DetalleCliente,
    cellClass: 'px-0'
  }
]

//Busqueda
const filterData = () => {
  if (filtro.value.trim() === '') {
    rowData.value = []
  } else {
    rowData.value = allData.filter(item => item.NombreCliente.toLowerCase().includes(filtro.value.toLowerCase()))
  }
}

const onSearchClick = () => {
  filterData()
}

const onEnterKey = event => {
  if (event.key === 'Enter') {
    filterData()
  }
}

const changeTab = ref(() => {})
const selectedClient = reactive({
  RUC_CLI: null,
  NombreCliente: null,
  codigo: null,
  direccion: null,
  provincia: null,
  telefono: null
})
provide('changeTab', changeTab)
provide('selectedClient', selectedClient)
provide('allData', allData)
function onRowDoubleClickProveedor(event) {
  Object.assign(selectedClient, event.data)
  changeTab.value('option-1')
}

const theme = useTheme()

const gridTheme = computed(() => {
  return theme.global.current.value.dark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'
})

function toggleDarkMode() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
watchEffect(() => {
  console.log('Modo oscuro activo:', theme.global.current.value.dark)
})
</script>
<template lang="pug">
v-container.py-2(fluid)
  v-row
    v-col(cols="3")
      v-card.pa-4.pb-0(variant="flat")
        div.gap-10
          v-text-field.gap-10(v-model="filtro" label="Buscar" placeholder="Ingrese Valor de Busqueda" @keyup.enter="onEnterKey")
          v-btn(variant="tonal" icon="mdi-magnify" @click="onSearchClick")
        div.gap-2 
          v-card(color="primary", variant="tonal", hover, dark)
            v-toolbar-title(variant="tonal") Modo Oscuro
            v-btn( variant="tonal" @click="toggleDarkMode") Cambiar tema 
        div(:class="gridTheme")
          agGrid(
                row-height="100"
                :column-defs="columnDefs"
                :data="rowData"
                :filtro="filtro"
                row-selection="single"
                :suppress-copy-rows-to-clipboard="true"
                :suppress-row-click-selection="false"
                style="width: 100%; height: calc(100vh - 280px)"
                @row-double-clicked="onRowDoubleClickProveedor"
                
                )
        div.py-6.w-100
          div.w200.mx-auto
            VFiltroInput( placeholder="Filtrado Rapido..." )
    v-col(cols="9")
      v-row
        
        v-col(cols="12")

          ConsultaClientes
 
</template>
<style lang="scss">
.v-btn--tonal:hover,
.v-toolbar--tonal:hover {
  background-color: #424242 !important; /* Color de fondo en hover */
  color: #f00 !important; /* Color del texto en hover */
}

.v-btn--tonal,
.v-toolbar--tonal {
  background-color: #333333 !important; /* Color de fondo base */
  color: #f00 !important; /* Color del texto base */
}

.v-btn--tonal:active,
.v-toolbar--tonal:active {
  background-color: #212121 !important; /* Color de fondo en estado activo */
  color: rgba(204, 18, 18, 0.905) !important; /* Color del texto en estado activo */
}
</style>
