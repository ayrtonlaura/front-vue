<script>
export default { name: 'cmp-ft-diferida' }
</script>

<script setup>
import { computed, reactive, ref } from 'vue';
import { sistemas_soporte_model } from '@/models'
import { $swal } from '@/plugins';
import { vMaska } from "maska";
import img_anulado from '@/assets/images/anulado.png'
const m_soporte = new sistemas_soporte_model()
const options = reactive({
  mask: "A##########",
  tokens: {
    A: { pattern: /[FB]/, transform: (chr) => chr.toUpperCase() }
  },
  eager: true
})

const caja = ref()
const isLoading = ref(false)
const gridApi = ref()
const columnDefs = ref([
  { field: 'cantidad', headerName: 'Cant.', width: 70, type: 'stock', sortable: false, headerComponent: null },
  { field: 'por_saldar', headerName: 'x Saldar', width: 70, type: 'stock', sortable: false, headerComponent: null },
  { field: 'stock', headerName: 'Stock', width: 60, sortable: false, headerComponent: null },
  { field: 'codigo', headerName: 'Código', width: 100, sortable: false, headerComponent: null },
  { field: 'producto', headerName: 'Producto', flex: 1, sortable: false, headerComponent: null },
  { field: 'precio', headerName: 'Precio', width: 80, type: 'precio', sortable: false, headerComponent: null },
  {
    headerName: 'Sub Total', width: 110, type: 'precio',
    sortable: false, headerComponent: null,
    valueGetter: (params) => {
      return params.data.precio * params.data.cantidad
    }
  },
])
const rowData = ref([])
const readyGrid = (params) => { gridApi.value = params.api }

const documento_actual = ref({
  cabecera: {},
  detalle: [],
  guias: [],
  opcion: ''
})

const busqueda = reactive({
  documento: '',
  base: 'JCHS2024'
})

async function buscar() {
  caja.value.blur()

  documento_actual.value = {
    cabecera: {},
    detalle: [],
    guias: [],
    opcion: ''
  }

  isLoading.value = true
  documento_actual.value = await m_soporte.pasar_a_diferida(busqueda)
  rowData.value = documento_actual.value.detalle
  isLoading.value = false
}

async function convertir() {
  let res = await m_soporte.convertir_a_diferida({ ...busqueda, tabla: documento_actual.value.opcion })
  if (res.ok) {
    $swal.fire('Documento modificado a DIFERIDO', false, 'success')
    documento_actual.value.opcion = ''
    documento_actual.value.detalle = []
  }
}

const deshabilitar_boton = computed(() => {
  if (documento_actual.value.detalle.length == 0) return true
  if (documento_actual.value.guias.length > 0) return true
  if (documento_actual.value.cabecera.estado == "A") return true
  if (documento_actual.value.cabecera.es_diferida == "SI") return true
  return false
})
</script>

<template lang="pug">
v-container(fluid)
  v-row(dense)
    v-col.py-4(cols="10")
      div.gap-10.align-center
        div.w110.px-2
          v-radio(:label="busqueda.base" :model-value="true")
        div.w150
          v-text-field.text-center(
            ref="caja"
            v-model="busqueda.documento" v-maska:[options]
            variant="outlined"
            density="compact"
            @keyup.enter="() => busqueda.documento.length == 11 && buscar()"
            )
            template(#label)
              span Nro de Documento ({{ busqueda.documento.length }})
        v-btn(append-icon="mdi-magnify" :disabled="busqueda.documento.length < 11" :loading="isLoading" @click="buscar") Buscar
        v-spacer
        div.gap-5.text-h6.mr-5.text-green(v-if="documento_actual.opcion !== ''")
          i.mdi.mdi-alert-circle
          span En documentos 
            span.font-weight-bold {{ documento_actual.opcion }}

      //- div.text-h6 {{ documento_actual }}

      div.pa-2.mt-21(v-if="documento_actual.opcion !== ''")
        v-card.elevation-0.bg-transparent.border
          v-card-text.px-3.py-2.p-relative
            img.anulado(v-if="documento_actual.cabecera.estado=='A'" :src="img_anulado")

            div.gap-5
              div.gap-5.flex-fill
                div.gap-5.align-center
                  span.text-h3 {{ documento_actual.cabecera.td }} {{ documento_actual.cabecera.serie }}{{ documento_actual.cabecera.numero }}
                  span.text-h6 ({{ documento_actual.cabecera.fecha }})
                v-chip.ml-2(v-if="documento_actual.cabecera.es_diferida == 'SI'" size="x-small" variant="flat" color="amber")
                  v-icon(start icon="mdi-tag mdi-10px")
                  span.text-caption DIFERIDA
              v-spacer
              div.gap-5.align-center
                span.x-label Vendedor:
                span.text-h6 {{ documento_actual.cabecera.vendedor }}

            div.text-h6.mt-1.mb-3 Agencia: 
              span.font-weight-bold {{ documento_actual.cabecera.agencia_codigo }} - {{ documento_actual.cabecera.agencia }}

            div.gap-5.my-2
              div.gap-5.align-xcenter.flex-column.flex-fill
                div.gap-5.align-center
                  span.x-label Cliente:
                  span.text-h6 {{ documento_actual.cabecera.cliente_codigo }} - {{ documento_actual.cabecera.cliente }}
                div.gap-5.align-center
                  span.x-label Cond. Pago:
                  span.text-h6 {{ documento_actual.cabecera.forma_codigo }} - {{ documento_actual.cabecera.forma }}
              div.gap-5.flex-column
                div.gap-5.align-center
                  span.x-label.bg-blue Almacén:
                  span.text-h6 {{ documento_actual.cabecera.almacen_codigo }} - {{ documento_actual.cabecera.almacen }}
                div.gap-5.align-center
                  span.x-label Moneda:
                  span.text-h6.font-weight-bold {{ documento_actual.cabecera.moneda }}

            agGrid.my-2(
              :row-data="rowData"
              :column-defs="columnDefs"
              style="width:100%; height:250px"
              @grid-ready="readyGrid"
              )

            div.gap-5
              div.gap-5.align-center.flex-fill
                span.x-label Usuario:
                span.text-h6 {{ documento_actual.cabecera.usuario_codigo }} - {{ documento_actual.cabecera.usuario }}
              div.gap-5.align-center.w200
                span.x-label Fec. Emisión:
                span.text-h6 {{ documento_actual.cabecera.creacion_fecha }} {{ documento_actual.cabecera.creacion_hora }} 
              v-spacer
              div.gap-5.align-center
                span.x-label Total:
                span.text-h4.font-weight-bold {{ documento_actual.cabecera.importe }}

      div.py-15.text-center(v-else)
        span.text-h6 No hay informacion para mostrar

    v-col.gap-0.pa-0.flex-column(cols="2")
      div.mx-auto.my-3
        v-btn(rounded :color="deshabilitar_boton ? 'grey' : 'amber'" append-icon="mdi-flash" :disabled="deshabilitar_boton" @click="convertir") Convertir a Diferida

      template(v-if="documento_actual.guias.length > 0")
        div.px-3.my-2.gap-0.flex-column
          span.text-h6.text-red No se puede convertir, <br>tiene {{ documento_actual.guias.length }} guias vigentes:

          div.gap-4.flex-column.mt-1
            template(v-for="item of documento_actual.guias" :key="item")
              div.gap-3.flex-column.border.rounded.pa-1
                span.text-h5.text-blue.font-weight-bold {{ item.guia }}
                span.text-h6.text-blue {{ item.almacen_codigo }} - {{ item.almacen }}

      div.px-3.my-2.gap-0.flex-column(v-if="documento_actual.cabecera?.es_diferida == 'SI'")
        span.text-h6.text-red No se puede proceder, ya es un 
          span.font-weight-bold documento diferido

</template>

<style scoped>
.x-label {
  font-size: 11px;
  background-color: #e5eaf1;
  border-radius: 3px;
  width: 80px;
  min-width: 80px;
  text-align: right;
  padding: 2px 4px;
}

img.anulado {
  position: absolute;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transform: rotate(-15deg);
}
</style>