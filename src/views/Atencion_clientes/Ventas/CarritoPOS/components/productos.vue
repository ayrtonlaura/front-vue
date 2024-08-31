<script>
export default { name: 'cmp-productos' }
</script>
<script setup>
import {
  ref,
  // reactive, toRaw,
  // onMounted,
  watch,
  computed,
  inject
} from 'vue'

import { LineasProductosModel, AlmacenesModel, StockModel, StockExcelModel, ProductoModel } from '@/models'
import {
  $toast
  // , $numeral
} from '@/plugins'
import steps from '../tour-steps'

import moneda_usa from '@/assets/images/moneda_usa.png'
import moneda_peru from '@/assets/images/moneda_peru.png'

// import renderDescripcion from './renders/renderDescripcion.vue'
// import renderCantidadConsignacion from './renders/renderCantidadConsignacion.vue'
import cmp_lineas from './dialogos/dialogo_lineas_productos'
// import dialogo_stock from './dialogos/dialogo_stock.vue'
import btn_tipo_cambio from './btns/btn_tipo_cambio.vue'

const test = ref(false)

const m_producto = new ProductoModel()

const { config, filtro, modo, toggle, columnas, resultado, carrito, loadings, tablas, busqueda, Sw_limpiarCarrito } = inject('prov_carrito')

watch(
  () => Sw_limpiarCarrito.value,
  v => {
    if (v) {
      console.log('limpio: productos')
      // tab.value = "carrito"
      busqueda.q = ''
      data.value = []
    }
  },
  {
    deep: true
  }
)

watch(
  columnas,
  m => {
    // console.log(m);
    if (gridApi.value) gridApi.value.setGridOption('columnDefs', m)
  },
  {
    inmediate: true
  }
)

watch(test, m => {
  gridApi.value.setColumnsVisible(['producto_codigo'], m)
})

// import { $http, $numeral } from '@/plugins'
// import { useRoute } from 'vue-router'

const toggle_icono = computed(() => {
  return modo.value == 'normal' ? 'mdi-arrow-expand-horizontal' : 'mdi-arrow-collapse-horizontal'
})

// import { AgToggleButton } from 'ag-grid-community'

// const route = useRoute()
// const base = route.params.base
// const agencia = route.params.agencia
// const usuario = route.params.usuario
// const base = 'JCHS2024'
// const agencia = '9000'
// const usuario = 'LMVN'

// console.log(base);
// console.log(agencia);
// console.log(usuario);

// const m_common = new CommonModel()
const m_lineas_produtos = new LineasProductosModel()
const m_almacenes = new AlmacenesModel()
const m_stock = new StockModel()
const m_stock_excel = new StockExcelModel()

const componenteLineas = ref()

const gridApi = ref(null)
// const filtro = ref('')
const diag_stock = ref()

const isLoading = ref(false)
const txtBuscar = ref()
const error = ref(false)

const lineas = ref([])

// const busqueda = reactive({
//   q: '',
//   base,
//   todo: false,
//   ceros: false,
//   transito: false,
//   lineas: []
// })

const readyTabla = params => {
  gridApi.value = params.api
  gridApi.value.setGridOption('columnDefs', columnas)
  listar_almacenes()
}

const data = ref([])
// const no_usar = ref(false)

async function listar_almacenes() {
  gridApi.value.setGridOption('columnDefs', columnas)
  // isLoading.value = false
}

async function buscar() {
  isLoading.value = true
  $toast.clear() // hide
  filterReset()
  filtro.value = ''

  gridApi.value.setGridOption('rowData', [])
  gridApi.value.showLoadingOverlay()

  data.value = await m_producto.pedidos_pos_buscar(busqueda).catch(e => {
    console.log(e.response.status, e.response.statusText)
    $toast.error(`Error: ${e.response.status} - ${e.response.statusText}`, { position: 'bottom-center', timeout: 5000 })
    gridApi.value.hideOverlay()
    isLoading.value = false
  })

  isLoading.value = false
  gridApi.value.hideOverlay()
}

watch(filtro, async newQuestion => {
  gridApi.value.setGridOption('quickFilterText', newQuestion)
  gridApi.value.redrawRows()
})

function onRowDataUpdated() {
  // if (gridApi.value) {
  //   habilitaExcel.value = gridApi.value.getDisplayedRowCount() == 0 ? false : true
  // } else {
  //   habilitaExcel.value = false
  // }
}

const tour = ref()

const optionsVueTour = {
  buttonLabels: {
    next: 'Siguiente',
    prev: 'Atrás',
    finish: 'Finalizar',
    skip: 'Omitir'
  }
}

function ayuda() {
  localStorage.removeItem('vjt-default')
  tour.value.startTour()
  tour.value.resetTour()
}

const filter_active = ref(null)

function filterReset() {
  gridApi.value.setFilterModel(null)
  filter_active.value = null
}
async function filterLiquidacion() {
  filter_active.value = 'liqui'
  await gridApi.value.setFilterModel({ en_liquidacion: { type: 'startsWith', filter: 'S' } })
  gridApi.value.onFilterChanged()
}

async function filterPromocion() {
  filter_active.value = 'promo'
  await gridApi.value.setFilterModel({ en_promocion: { type: 'startsWith', filter: 'S' } })
  gridApi.value.onFilterChanged()
}
</script>
<template lang="pug">
v-container.pa-1(fluid)

  VTour(ref="tour" :steps="steps" auto-start :button-labels="optionsVueTour.buttonLabels" highlight)

  //- dialogo_stock(ref="diag_stock")

  v-row(dense align="center")
    v-col.py-0(cols="12")
      div.gap-10.align-center
        div.w250
          v-text-field(
            ref="txtBuscar" 
            v-model="busqueda.q" 
            data-step="1"
            placeholder="Buscar productos" 
            persistent-placeholder 
            label="Buscar por código o descripción" 
            variant="filled"
            :error-messages="error ? 'err' : ''"
            hide-details
            :disabled="isLoading"
            @keyup.enter="buscar()" 
            )
        //- div.w90
          v-checkbox(v-model="busqueda.todo" data-step="2" label="Todo (*)")
        div.gap-4.align-center
          v-btn.pa-2.px-4.rounded-s-xl(data-step="6" :loading="isLoading" color="amber" @click="buscar()" height="36" append-icon="mdi-magnify") Buscar stock

          v-menu(:close-on-content-click="false" location="bottom" offset="6" eager)
            template(v-slot:activator="{ props }")
              v-btn.rounded-s(variant="tonal" :disabled="isLoading" icon="mdi-chevron-down mdi-16px" v-bind="props" size="32" v-tippy content="Más opciones")

            v-card(min-width="240")
              v-card-text.pa-2
                div.xw170
                  cmp_lineas(ref="componenteLineas" data-step="3" v-model="busqueda.lineas_productos" :lineas="config.lineas_productos")

                div.xw100.mt-2
                  v-checkbox(v-model="busqueda.transito" data-step="4" label="Guías en Tránsito" disabled)
                  v-checkbox(v-model="busqueda.ceros" data-step="5" label="Stock con CEROS" disabled)

        v-spacer

        btn_tipo_cambio(:valor="config.tipo_cambio")
        //- :loading="loadings.tc" 

        v-menu
          template(v-slot:activator="{ props }")
            div.w105.border.pa-1.rounded.gap-6.align-center.cursor-pointer(v-bind="props")
              div.gap-6
                v-img.ml-1(:src="carrito.moneda == 'US' ? moneda_usa : moneda_peru" width="16" height="11")
                span.text-h6 {{ carrito.moneda == 'US' ? 'Dólares' : 'Soles' }}
              v-spacer
              v-icon(icon="mdi-chevron-down" size="16")

          v-list.py-0(density="compact")
            template(v-for="m of [{ code: 'MN', img: moneda_peru, text: 'Soles' }, { code: 'US', img: moneda_usa, text: 'Dólares' }]")
              v-list-item(@click="carrito.moneda = m.code")
                template(v-slot:prepend)
                  v-img(:src="m.img" width="16" height="11")
                span.text-h6.pl-2 {{ m.text }}

  v-row(dense)
    v-col
      agGrid.xxx(
        data-step="7"
        :on-filter-changed="onRowDataUpdated"
        :on-row-data-updated="onRowDataUpdated"
        :suppress-context-menu="true"
        :suppress-row-click-selection="false"
        :suppress-copy-rows-to-clipboard="true"
        :suppress-property-names-check="true" 
        :data="data"
        :filtro="filtro"
        :header-height="36"
        :groupHeaderHeight="24"
        :row-height="38"
        row-selection="multiple"
        style="width: 100%; height: calc(100vh - 200px)"
        @grid-ready="readyTabla"
        )

    //- v-col(cols="2" style="overflow-y:auto; height: 400px")
      pre.text-caption {{busqueda}}

  v-row(dense align="center")
    v-col.gap-10(cols="6")
      v-btn.mr-1(v-ripple="false" :icon="`${toggle_icono} mdi-16px`" size="30" @click="toggle")    

      div.w125
        v-checkbox(label="Mostrar Códigos" v-model="test")
      v-divider.mx-2(vertical)
      v-btn(variant="tonal" prepend-icon="mdi-help mdi-14px" rounded @click="ayuda()" disabled) Guía de uso
      v-divider.mx-2(vertical)

      v-btn(@click="filterPromocion()" rounded color="amber" :prepend-icon="filter_active=='promo' ? 'mdi-eye': ''") Promoción
      v-btn(@click="filterLiquidacion()" rounded color="success" :prepend-icon="filter_active=='liqui' ? 'mdi-eye': ''") Liquidación
      v-btn(@click="filterReset()" rounded color="grey" :disabled="!filter_active") Todos

    v-col.gap-10.justify-end(cols="6")
      div.w260
        v-filtro-input(v-model="filtro" data-step="8" placeholder="Filtrar resultados..")
      //- div.px-5.gap-6.text-h6.align-center
        span Resultados: 
        span.font-weight-bold.text-blue-darken-4 {{ data.length }}

    //- v-col.gap-0.flex-column(cols="2")
      div.w160
        v-btn.mx-auto.px-7(data-step="9" :loading="isLoading" :disabled="!habilitaExcel" rounded color="green" height="44" @click="exportar_excel()")
          template(#default)
            div.gap-10.align-center
              div.gap-2.flex-column
                span.text-h5 Descargar en Excel
                span.text-caption con <u>stock controlado</u>
              v-icon(size="20") mdi-download
      
</template>
<style>
.precio {
  background-color: rgb(255 238 0 / 0.1);
}

.separacion {
  background-color: rgb(255 145 0 / 0.1);
}

.consignacion {
  background-color: rgb(0 255 34 / 0.1);
}

.transito {
  background-color: rgb(0 140 255 / 0.1);
}

.xxx {
  --ag-selected-row-background-color: rgba(66, 133, 244, 0.2);
}
</style>
