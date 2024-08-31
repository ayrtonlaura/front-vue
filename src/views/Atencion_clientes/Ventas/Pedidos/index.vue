<script>
export default { name: 'atencion-clientes-ventas-pedidos' }
</script>
<script setup>
import { inject, provide, reactive, ref, watch } from 'vue'
import { $yup, $moment } from '@/plugins'

import { carrito_ventas_model } from '@/models'
import pedido_render from './renders/PedidoRender.vue'
import acciones_render from './renders/AccionesRender.vue'
import almacen_render from './renders/AlmacenRender.vue'
import vendedor_aprobado_render from './renders/VendedorAprobadoRender.vue'
import situacion_render from './renders/SituacionRender.vue'
import importe_render from './renders/ImporteRender.vue'

import dialogo_pedido_pdf from '@/views/Atencion_clientes/Ventas/CarritoPOS/components/dialogos/dialogo_pedido_pdf'
import dialogo_pedido from './dialogos/dialogo_pedido.vue'

const { sesion } = inject('Menus')
const m_carrito = new carrito_ventas_model()
const cmp_dialogo_pedido_pdf = ref()

const carrito = reactive({
  almacen_prime: null,
  empresa: sesion.value.conexion.id,
  caja: sesion.value.usuario.caja,
  centro_costo: sesion.value.usuario.centro_costo,
  empresa_abrev: sesion.value.conexion.empresa_abrev,
  agencia_codigo: sesion.value.agencia_codigo,
  vendedor_id: sesion.value.vendedor_id,
  usuario_id: sesion.value.usuario_id,
  cliente: {
    id: null,
    nombre: null,
    direccion_entrega: null
  },
  moneda: 'US',
  // tipo_cambio: config.tipo_cambio,
  tipo_cambio: 7.2,

  forma: '', // TODO: set default
  forma_nombre: '',

  precio: '', // TODO: set default
  precio_nombre: '',

  importe: 0,
  cantidad: 0,
  fecha: $moment(),
  productos: [],

  orden_compra: '',
  placa: '',
  tipo_atencion: null,
  tipo_entrega: null,
  lugar_entrega: null,
  agencia_transporte: null
})


provide('prov_carrito_editar', {
  // tablas,
  // config,
  // busqueda,
  // filtro,
  // // loadings,
  // modo,
  // toggle,
  // columnas,
  carrito,
  // limpiarCarrito,
  // Sw_limpiarCarrito
  // loadTipoCambio
})


const datos = ref({
  agencia: null,
  almacen: null,
  vendedor: null,
  estado: '-',
  fecha: [$moment(), $moment()],
})
const filtro = ref('')

const rowData = ref([])
const gridPedidos = ref({})
const readyGrid = params => (gridPedidos.value = params.api)

const schema = $yup.object().shape({
  estado: $yup.string().required(),
  vendedor: $yup.string().required(),
  almacen: $yup.string().required(),
  agencias: $yup.string().required(),
})

const estadoMap = ref([
  { codigo: 'A', descripcion: 'Aprobado' },
  { codigo: 'P', descripcion: 'Pendiente' },
  { codigo: 'F', descripcion: 'Facturado' },
  { codigo: 'X', descripcion: 'Rechazado' },
  { codigo: '-', descripcion: 'Todos' },
])

const columnDefs = [
  {
    minWidth: 200,
    headerName: 'Datos del Pedido',
    field: 'F5_CNUMPED',
    // wrapText: true,
    cellRenderer: pedido_render,
    flex: 1,
    cellStyle: { display: 'inline-flex', padding: '6px' },
    // cellClass: 'text-truncate'
  },
  {
    headerName: 'Fecha Pedido',
    field: 'F5_DFECDOC',
    width: 95,
    cellRenderer: params => $moment(params.value).format("DD/MMM/YYYY").replace(".", ""),
    cellStyle: { display: 'inline-flex', padding: '6px' },
    cellClass: 'justify-center',
  },
  {
    headerName: 'Condición Venta',
    wrapText: true,
    field: 'FV_CDESCRI',
    width: 100,
    // cellRenderer: forma_almacen_render,
    cellStyle: { display: 'inline-flex', padding: '6px' },
    cellClass: 'justify-center text-center text-h6',
  },
  {
    headerName: 'Almacén',
    field: 'almacen',
    width: 180,
    wrapText: true,
    cellRenderer: almacen_render,
    cellStyle: { display: 'inline-inline', padding: '6px' },
    cellClass: 'justify-center',
  },
  {
    headerName: 'Vendedor',
    field: 'VE_CNOMBRE',
    width: 120,
    wrapText: true,
    cellRenderer: vendedor_aprobado_render,
    cellStyle: { display: 'inline-flex', padding: '6px' },
  },
  {
    headerName: 'Situacion',
    field: 'F5_CESTADO',
    width: 150,
    cellRenderer: situacion_render,
    // cellClass: 'situacion-center',
    cellStyle: { display: 'inline-flex', padding: '6px', textAlign: 'center' },
    cellClass: 'justify-center text-truncate',
  },
  {
    headerName: 'Monto', field: 'F5_NIMPORT',
    width: 100,
    cellRenderer: importe_render,
  },
  { headerName: 'Usuario', field: 'F5_CUSUCRE', width: 80, hide: true },
  {
    headerName: 'Acciones',
    width: 120,
    cellRenderer: acciones_render,
    cellRendererParams: params => {
      return {
        pedido_pdf: () => {
          cmp_dialogo_pedido_pdf.value.cargar_pdf({ empresa: sesion.value.conexion.id, pedido: String(params.data.F5_CNUMPED) })
        },
        eliminar: () => console.log('eliminar()'),
        editar: () => console.log('editar()'),
      }
    },
    cellStyle: {
      display: 'inline-flex',
      padding: '0',
      justify: 'center'
    }
  },
  { hide: true, field: 'proveedor' }
]

const loadPedidos = async () => {
  gridPedidos.value.setGridOption('rowData', [])

  gridPedidos.value.showLoadingOverlay()
  let ret = await m_carrito.listado({ empresa: sesion.value.conexion.id })
  rowData.value = ret.data
  gridPedidos.value.hideOverlay()
}

watch(filtro, async newQuestion => {
  gridPedidos.value.setQuickFilter(newQuestion)
  gridPedidos.value.redrawRows()
})
</script>
<template lang="pug">
v-container.px-5(fluid)

  dialogo_pedido_pdf(ref="cmp_dialogo_pedido_pdf")
  dialogo_pedido

  Form(ref="formConsignaciones" v-slot="{ errors }" :validation-schema="schema")
    v-row(dense align="center")
      v-col.gap-10.mb-1(cols="12") 
        div.w200
          Field(v-slot="{ field }" v-model="datos.agencias" name="agencias")
            v-select(
              label="Agencias"
              placeholder="Seleccione una Agencia"
              :error-messages="errors.agencias"
              :hide-details="true" v-bind="field"
              item-title="nombre"
              item-value="id"
              disabled
            )
        div.w200
          Field(v-slot="{ field }" v-model="datos.almacen" name="almacen")
            v-select(
              label="Almacen"
              placeholder="Seleccione un almacen"  
              :error-messages="errors.almacen"
              :hide-details="true" v-bind="field"
              item-title="nombre"
              disabled
            )
        div.w150
          Field(v-slot="{ field }" v-model="datos.vendedor" name="vendedor")
            v-select(
              item-title="nombre"
              label="Vendedor" placeholder="Seleccione un vendedor"  
              :error-messages="errors.vendedor" 
              :hide-details="true" v-bind="field"
              disabled
            )
        div.w100
          Field(v-slot="{ field }" v-model="datos.estado" name="estado")
            v-select(
              v-model="datos.estado"
              label="Estado"
              placeholder="Seleccione un Estado"  
              :error-messages="errors.estado"
              item-value="codigo"
              item-title="descripcion"
              :return-object="false"
              :items="estadoMap"
              v-bind="field"
              :hide-details="true" 
            )

        v-fecha.w220(v-model="datos.fecha" titulo="Rango de fechas")

        v-btn.mt-1.px-4(color="primary" rounded prepend-icon="mdi-magnify" @click="loadPedidos()") Buscar

  v-row(dense)
    //- v-col(cols="2")
      pre.text-caption {{ datos }}
    v-col
      agGrid(
        :column-defs="columnDefs"
        :data="rowData"
        row-height="45"
        :filtro="filtro"
        :include-hidden-columns-in-quick-filter="true"
        :suppress-row-click-selection="true"
        style="width: 100%; height: calc(100vh - 190px)"
        @grid-ready="readyGrid"
      )

  v-row(dense align="center")
    v-spacer
    v-col(cols="3")
      VFiltroInput(v-model="filtro" placeholder="Filtrar resultados..." )


</template>
