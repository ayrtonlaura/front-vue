<script>
export default { name: 'atencion-clientes-ventas-carrito-pos' }
</script>
<script setup>
import { inject, onMounted, reactive, ref, provide, nextTick } from 'vue'

import {
  // TipoCambioModel, LineasProductosModel,
  // sistemas_modulo_model,
  carrito_ventas_model
} from '@/models'

import dialogo_stock from './components/dialogos/dialogo_stock.vue'

import cmpProducto from './components/productos.vue'
import cmpCarritoCliente from './components/carrito_cliente.vue'
import renderDescripcion from './components/renders/renderDescripcion.vue'
import { $moment, $swal } from '@/plugins'

const { sesion } = inject('Menus')

const blockeo = ref(false)

const modo = ref('normal')
const filtro = ref('')
const cmp_dialogo_stock = ref()

const config = reactive({
  tipo_cambio: 0,
  almacenes: [],
  precios: [],
  formas: [],
  clientes_tipos: [],
  transito: 'N',
  lineas_productos: [],
  redondeo: 1
})

const tablas = ref({
  distritos: null,
  paises: null
})

const mi_sesion = reactive({
  usuario_id: sesion.value.usuario.codigo,
  vendedor_id: sesion.value.usuario?.vendedor,
  agencia_codigo: sesion.value.agencia?.codigo,
  agencia_nombre: sesion.value.agencia?.nombre,
  empresa_id: sesion.value.conexion?.id
})

const busqueda = reactive({
  empresa_id: mi_sesion.empresa_id,
  almacenes: config.almacenes,
  precios: config.precios,
  q: '',
  lineas_productos: '0013,0009,0005,0001,0021,0017,0041,0037,0033,0029,0049,0045,0053,0007,0006,0065,0057,0061,0069',
  transito: config.transito,
  ceros: 'N'
})

const columnas = reactive([
  {
    headerName: 'Código',
    field: 'producto_codigo',
    hide: true,
    width: 80,
    cellClass: ['justify-center', 'text-caption']
  },

  { field: 'en_liquidacion', filter: 'agTextColumnFilter', hide: true },
  { field: 'en_promocion', filter: 'agTextColumnFilter', hide: true },

  {
    headerName: 'Producto',
    field: 'producto_descripcion',
    flex: 1,
    wrapText: true,
    cellRenderer: renderDescripcion,
    cellRendererParams: () => {
      return {
        filtro: filtro.value,
        detalles: params => {
          cmp_dialogo_stock.value.mostrar({
            empresa: sesion.value.conexion.id,
            agencia: sesion.value.agencia.codigo,
            tipo: 'N',
            params
          })
        },
        clicked: params => {
          // console.log(params);

          let sin_precio = false
          for (const [key, value] of Object.entries(params)) {
            if (key.length === 3 && key.substring(0, 2) === 'P0') {
              // console.log(`${key}: ${value}`);
              if (parseFloat(value) == 0 || !value) {
                // console.log('sin precio');
                sin_precio = true
              }
            }
          }
          // console.log(sin_precio);
          if (sin_precio) {
            return $swal.fire({
              icon: 'warning',
              title: 'Producto sin precio',
              html: 'El producto no se puede añadir al carrito porque no tiene un precio establecido.<br>Comuníquese con el <b>Área de Desarrollo Comercial</b>.'
            })
          }

          let index = carrito.productos.findIndex(item => item.producto_codigo == params.producto_codigo)

          if (index === -1) {
            params.aprobado = true
            params.cantidad = 1
            params.porcentaje = 0
            params.precio_us = params[carrito.precio]
            params.precio_mn = (params[carrito.precio] * carrito.tipo_cambio).toFixed(config.redondeo)
            carrito.productos.push(params)
          } else {
            carrito.productos[index].cantidad += 1
          }
        }
      }
    },
    cellStyle: { padding: '0 4px' }
  }
])

const m_carrito = new carrito_ventas_model()

async function setConfiguracion() {
  // columnas.splice(3, 1)
  // columnas.splice(2, 1)

  let res = config.almacenes
  let xconfig = JSON.parse(res.opciones)

  if (xconfig.formas.CONTADO) {
    xconfig.formas.CONTADO.forEach(el => {
      config.formas.push({ nombre: `CONTADO`, precio: el.nombre, forma_id: '001', precio_id: el.codigo })
    })
  }

  if (xconfig.formas.TARJETA) {
    xconfig.formas.TARJETA.forEach(el => {
      config.formas.push({ nombre: `TARJETA`, precio: el.nombre, forma_id: '003', precio_id: el.codigo })
    })
  }

  let xprecios = [...xconfig.formas.CONTADO, ...xconfig.formas.TARJETA]
  console.log(xprecios)
  let cols_precios = []
  xprecios.forEach(m => {
    let find = cols_precios.findIndex(p => p.field === m.id)
    if (find === -1) {
      let nom = m.nombre.replace(' PRECIO ', ' ')
      cols_precios.push({
        field: m.codigo,
        headerName: nom,
        width: 75,
        type: 'precio',
        headerClass: ['precio']
      })
    }
  })

  config.precios = cols_precios
  busqueda.precios = cols_precios.map(item => item.field).join(',')

  console.log(cols_precios)
  columnas.push({
    headerName: 'Precios',
    children: [...cols_precios]
  })

  // -> 👉 Columnas ALMACENES
  let xalmacenes = xconfig.almacenes.map(item => {
    return { headerName: item.abrev, field: `A${item.almacen_codigo}`, width: 55, type: 'stock' }
  })

  columnas.push({
    headerName: 'Stocks',
    children: xalmacenes
  })

  busqueda.almacenes = xalmacenes.map(item => item.field).join(',')
}

function toggle() {
  modo.value = modo.value == 'normal' ? 'mini' : 'normal'
}

const carrito = reactive({
  almacen_prime: null,
  empresa: sesion.value.conexion.id,
  caja: sesion.value.usuario.caja,
  centro_costo: sesion.value.usuario.centro_costo,
  empresa_abrev: sesion.value.conexion.empresa_abrev,
  agencia_codigo: mi_sesion.agencia_codigo,
  vendedor_id: mi_sesion.vendedor_id,
  usuario_id: mi_sesion.usuario_id,
  cliente: {
    id: null,
    nombre: null,
    direccion_entrega: null
  },
  moneda: 'US',
  tipo_cambio: config.tipo_cambio,

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

const loading_entorno = ref(false)

const errores = ref([])

async function load_configuracion() {
  blockeo.value = false
  loading_entorno.value = true
  let response = await m_carrito.configuracion({
    modulo: 'Pedidos POS',
    empresa: sesion.value.conexion.id,
    agencia: sesion.value.agencia.codigo
  })

  loading_entorno.value = false

  let err = []

  if (!response.serie_pedido)
    err.push(
      `La agencia <u class="text-indigo">${sesion.value.agencia.codigo} - ${sesion.value.agencia.nombre}</u> no tiene una <u>numeración de Pedidos</u> asignada [@@PD]`
    )

  if (!response.modulo)
    err.push(
      `La agencia <u class="text-indigo">${sesion.value.agencia.codigo} - ${sesion.value.agencia.nombre}</u> no tiene la configuración requerida`
    )

  if (!response.lineas_productos) err.push(`Error al cargar las <u class="text-indigo">lineas de productos</u>`)

  if (!response.tc)
    err.push(
      `El <u class="text-indigo">tipo de cambio</u> de hoy no se ha establecido. Comuníquese con el <u class="text-indigo">Área de Contabilidad</u>`
    )

  if (err.length > 0) {
    errores.value = err.join('<br><br>')
    blockeo.value = true
    return
  }

  config.tipo_cambio = response.tc.TC ? parseFloat(response.tc.TC) : 0
  config.lineas_productos = response.lineas_productos
  config.almacenes = response.modulo
  tablas.value.paises = response.paises
  tablas.value.distritos = response.distritos
  setConfiguracion()
}

onMounted(async () => {
  await load_configuracion()
  carrito.tipo_cambio = config.tipo_cambio

  // await loadConfig()
  // await loadTipoCambio()
  // await loadLineasProductos()
  // busqueda.precios = config.precios
})

const Sw_limpiarCarrito = ref(false)

function limpiarCarrito() {
  Sw_limpiarCarrito.value = true

  nextTick(() => {
    console.log('limpiarCarrito')

    // Object.assign(carrito, JSON.parse(JSON.stringify(initialState)))
    carrito.productos = []
    carrito.moneda = 'US'
    carrito.cliente = {
      id: null,
      nombre: null,
      direccion_entrega: null
    }

    carrito.orden_compra = ''
    carrito.placa = ''
    carrito.tipo_atencion = null
    carrito.tipo_entrega = null
    carrito.lugar_entrega = null
    carrito.agencia_transporte = null

    Sw_limpiarCarrito.value = false
  })
}

provide('prov_carrito', {
  tablas,
  config,
  busqueda,
  filtro,
  // loadings,
  modo,
  toggle,
  columnas,
  carrito,
  limpiarCarrito,
  Sw_limpiarCarrito
  // loadTipoCambio
})
</script>
<template lang="pug">
div.gap-10.pa-3.p-relative

  dialogo_stock(ref="cmp_dialogo_stock")

  v-dialog(
    v-model="loading_entorno" scrim="white" persistent contained no-click-animation width="300" 
    style="backdrop-filter: blur(2px);"
    )
    div.gap-10.flex-column.align-center
      v-progress-circular(:size="30" :width="2" color="primary" indeterminate)
      span.text-h6.font-weight-bold Configurando entorno...

  v-dialog(v-model="blockeo" persistent contained no-click-animation width="340")
    v-card.px-2.pb-3.pt-1
      v-card-text.px-5
        div.gap-8.flex-column.align-center.text-center
          v-icon(size="40" color="grey-lighten-2") mdi-alert-circle
          span.text-h5.font-weight-bold(style="line-height: 18px !important") Oops! se han presentado algunos inconvenientes
          span.text-h6(style="line-height: 16px !important" v-html="errores")

  //- pre.text-caption.w150 {{ carrito }}
  cmpProducto.flex-fill
  cmpCarritoCliente(:class="modo == 'normal' ? 'w330' : 'w100'")

</template>
<style>
.precio {
  /* color: red; */
  background-color: transparent;
  padding: 0 2px !important;
}
</style>
