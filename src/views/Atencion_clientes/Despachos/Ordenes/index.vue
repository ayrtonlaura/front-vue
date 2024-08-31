<script>
export default { name: 'atencion-clientes-despachos-ordenes' }
</script>
<script setup>
import { onMounted, ref, watch, reactive, provide, inject, toRaw } from 'vue'

import cmp_ordenes from './components/cmp_ordenes.vue'
import cmp_orden_form from './components/cmp_orden_form.vue'
import cmp_guias_buscar from './components/cmp_guias_buscar.vue'

import dialogo_info_guia from './components/dialogos/dialogo_info_guia.vue'
import dialogo_info_ubicacion from './components/dialogos/dialogo_info_ubicacion.vue'
// import dialogo_buscar_orden from './components/dialogos/dialogo_buscar_orden.vue'

import { despachos_model } from '@/models'
import { $moment, $toast } from '@/plugins'

const { sesion } = inject('Menus')

const m_despacho = new despachos_model()
// const m_orden = new despachos_orden_model()

const cmp_ordenes_ref = ref()
const cmp_dialogo_info_guia_ref = ref()
const cmp_dialogo_info_ubicacion_ref = ref()

const gridApi = ref(null)

const filtro = ref('')

const ordenes = ref([])

const orden_actual = ref({
  chofer: null,
  fecha: $moment().utc(-5).format("YYYY-MM-DD"),
  nota: null,
  guias: []
})

const loadings = reactive({
  listando: false,
  guardando: false,
  editando: false,
  en_creacion: false,
  buscando_orden: false
})

async function ordenes_registradas() {
  entorno.buscado = true
  loadings.listando = true
  ordenes.value = []
  ordenes.value = await m_despacho.ordenes().finally(() => loadings.listando = false)
}

async function modificar_orden(item) {

  orden_actual.value.id = item.id

  loadings.buscando_orden = true
  let data = await m_despacho.orden_detalles({
    empresa: sesion.value.conexion.id,
    agencia: item.agencia_id,
    id: item.id
  })

  console.log(data);

  orden_actual.value.numeracion = data.numeracion
  orden_actual.value.agencia_id = data.agencia_id
  orden_actual.value.chofer = data.chofer_id
  orden_actual.value.fecha = data.fecha
  orden_actual.value.creado_en = data.creado_en
  orden_actual.value.nota = data.nota
  orden_actual.value.guias = toRaw(data.guias)

  loadings.en_creacion = true
  loadings.buscando_orden = false

}

const mostrar_dialogo_buscar_guias = ref(false)

function mostrar_buscar_guias() {
  // drawer.value = true
  mostrar_dialogo_buscar_guias.value = true
}

function crear_orden() {
  // console.log(22);
  // orden_actual.value.id = null
  // orden_actual.value.agencia_id = null
  // orden_actual.value.numeracion = null

  loadings.en_creacion = true
}

const agregar_guias = items => {
  cmp_ordenes_ref.value.gridApi.applyTransaction({ add: items })
  items.forEach(el => orden_actual.value.guias.push(toRaw(el)));
}

const onVerDetalles = (item) => {
  cmp_dialogo_info_guia_ref.value.ver_detalles(item)
}

const onVerUbicacion = (item) => {
  cmp_dialogo_info_ubicacion_ref.value.ver_ubicacion(item)
}

watch(filtro, async (newValue) => {
  gridApi.value.setGridOption('quickFilterText', newValue)
  gridApi.value.redrawRows()
})

const entorno = reactive({
  buscado: false,
  ok: false,
  loading: false,
  error: false,
  errores: [],
  choferes: [],
  almacenes: [],
  tipos_clientes: [],
  movimientos: [
    { id: '22', descripcion: '22 - Traslado entre almacenes' },
    { id: '01', descripcion: '01 - Venta' },
    { id: '08', descripcion: '08 - Regulariza Venta Diferida' }
  ]
})

async function load_entorno() {
  entorno.loading = true

  let temp = await m_despacho.entorno({ empresa: sesion.value.conexion.id, agencia: sesion.value.agencia.codigo })
  // console.log(temp);

  if (!temp.numeracion || temp.numeracion.length == 0) entorno.errores.push("Sin numeración configurada")
  if (!temp.choferes || temp.choferes.length == 1) entorno.errores.push("Sin choferes registrados")
  if (!temp.almacenes || temp.almacenes.length == 0) entorno.errores.push("Sin almacenes configurados")
  if (!temp.tipos_clientes || temp.tipos_clientes.length == 0) entorno.errores.push("Sin tipos de clientes registrados")

  if (entorno.errores.length > 0) {
    entorno.error = true
    entorno.loading = false
  } else {
    entorno.choferes = temp.choferes
    entorno.almacenes = temp.almacenes
    entorno.tipos_clientes = temp.tipos_clientes
    entorno.loading = false
  }
}

async function guardar_orden(data) {
  loadings.guardando = true
  $toast.clear()
  // console.log('guardar_orden', data)
  data.empresa = sesion.value.conexion.id
  data.agencia = sesion.value.agencia.codigo
  data.usuario = sesion.value.usuario.codigo
  let g = await m_despacho.guardar(data)

  if (g.ok) {
    $toast.success(`Orden ${g.orden} creada satisfactoriamente`, { position: 'bottom-center', timeout: 3000 })
    limpiar_form()
    loadings.guardando = false
    loadings.en_creacion = false
  } else {

    loadings.guardando = false
    // loadings.en_creacion = false
  }
}

async function actualizar_orden(data) {

  console.log('actualizar orden')

  let g = await m_despacho.actualizar(data)
  console.log(g);

  // loadings.guardando = true
  // $toast.clear()
  // // console.log('guardar_orden', data)
  // data.empresa = sesion.value.conexion.id
  // data.agencia = sesion.value.agencia.codigo
  // data.usuario = sesion.value.usuario.codigo
  // let g = await m_despacho.guardar(data)

  // if (g.ok) {
  //   $toast.success(`Orden ${g.orden} creada satisfactoriamente`, { position: 'bottom-center', timeout: 3000 })
  //   limpiar_form()
  //   loadings.guardando = false
  //   loadings.en_creacion = false
  // } else {

  //   loadings.guardando = false
  // }
}

async function cancelar_orden() {
  limpiar_form()
  loadings.en_creacion = false
}

async function limpiar_form() {
  orden_actual.value.id = null
  orden_actual.value.agencia_id = null
  orden_actual.value.numeracion = null
  orden_actual.value.creado_en = null

  orden_actual.value.chofer = null
  orden_actual.value.fecha = $moment().utc(-5).format("YYYY-MM-DD")
  orden_actual.value.nota = ''
  orden_actual.value.guias = []

  await cmp_ordenes_ref.value.form_orden_validar.resetForm({
    values: {
      chofer: null,
      fecha: orden_actual.value.fecha,
      nota: '',
      guias: []
    }
  })
}

onMounted(() => {
  // console.log(sesion.value);
  load_entorno()
})

provide("despachos", {

  loadings,

  ordenes,

  orden_actual,

  ordenes_registradas,

  mostrar_buscar_guias,
  modificar_orden,
  mostrar_dialogo_buscar_guias,

  crear_orden,
  // en_creacion,

  entorno,
  cancelar_orden,
  limpiar_form,

  agregar_guias,
  guardar_orden,
  actualizar_orden,
  onVerUbicacion,
  onVerDetalles,

})
</script>
<template lang="pug">
div.p-relative
  //- dialogo_buscar_orden(ref="cmpDialogoBuscarOrden" :choferes="choferes")

  v-config-entorno(:entorno="entorno")
  dialogo_info_guia(ref="cmp_dialogo_info_guia_ref")
  dialogo_info_ubicacion(ref="cmp_dialogo_info_ubicacion_ref")

  cmp_guias_buscar

  v-container.pa-3(fluid)

    v-row(dense)
      v-col(cols="5")
        cmp_ordenes
      v-col(cols="7")
        cmp_orden_form(ref="cmp_ordenes_ref" eager)

</template>
<style lang="scss">
.v-overlay .v-overlay__content:has(.drawer) {
  right: 0 !important;
}

.drawer {
  background-color: #f2f6fe;
  border: 3px solid rgba(66, 85, 214, .15);
  border-radius: 10px;
  top: 50% !important;
  padding: 10px !important;
  right: 20px;
  box-shadow: 0 0 30px 0 rgb(0 0 0 / .15);
}

:deep .x-btn {
  font-size: 11px;
  color: #e64a19;
  border: 1px solid #ff9e80;
  line-height: 19px;
  border-radius: 4px;
  padding: 0 10px;
  margin: auto;
  background-color: #fffde7;
}
</style>