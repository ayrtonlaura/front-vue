<script>
export default { name: 'sistemas-mantenimientos-modulos-pedidos-pos' }
</script>
<script setup>
import { ref, onMounted, reactive, watch, computed, provide, toRaw } from "vue"
import { $toast } from "@/plugins";
import draggableComponent from "vuedraggable";
import { sistemas_modulo_model } from "@/models";

import dialogo_precios from "./components/dialogo_precios.vue";
import dialogo_almacenes from "./components/dialogo_almacenes.vue";

//#region - Declaracion de variables
const MODULO = "Pedidos POS"
const m_modulo = new sistemas_modulo_model()
const cmp_dialogo_precios = ref()
const cmp_dialogo_almacenes = ref()

const listas = reactive({
  empresas: [],
  agencias: [],
  precios: [],
  tipos_clientes: []
})

const empresa_actual = ref(null)
const agencia_actual = ref(null)

const isLoading1 = ref()
const isLoading2 = ref()
const isLoading3 = ref()

const empresa_actual_pre = ref([])
const agencia_actual_pre = ref([])

const configuracion_default = ref({
  tipos_clientes: [],
  formas: {
    CONTADO: [],
    TARJETA: []
  },
  almacenes: [],
  transito: false
})

const configuracion = ref({
  tipos_clientes: [],
  formas: {
    CONTADO: [],
    TARJETA: []
  },
  almacenes: [],
  transito: false
})

const existe = computed(() => {
  return !!agencia_actual.value
})

const isLoadingGlobal = computed(() => {
  return isLoading1.value || isLoading2.value || isLoading3.value
})
//#endregion

async function loadEmpresas() {
  isLoading1.value = true
  let res = await m_modulo.get_empresas_activas()
  listas.empresas = res.data
  isLoading1.value = false
}

watch(() => empresa_actual_pre.value, (v) => {
  let tempo = v[0]
  if (!empresa_actual.value) loadAgencias(tempo)
  else if (empresa_actual.value.id !== tempo.id) loadAgencias(tempo)
})

async function loadAgencias(empresa) {

  agencia_actual.value = null

  empresa_actual.value = Object.assign({}, toRaw(empresa))

  isLoading2.value = true
  listas.agencias = await m_modulo.get_agencias_por_empresa({ id: empresa.id }).then(res => res.data)
  listas.precios = await m_modulo.get_tipos_precios({ lista: empresa.abreviatura }).then(res => res.data)
  listas.tipos_clientes = await m_modulo.get_tipos_clientes({ empresa: empresa.id }).then(res => res.data)
  isLoading2.value = false

}

watch(() => agencia_actual_pre.value, (v) => {
  let tempo = v[0]
  if (!agencia_actual.value) loadConfig(tempo)
  else if (agencia_actual.value.agencia_codigo !== tempo.agencia_codigo) loadConfig(tempo)

})

async function loadConfig(agencia) {
  agencia_actual.value = Object.assign({}, toRaw(agencia))
  configuracion.value = Object.assign({}, configuracion_default.value)
  configuracion.value.formas.CONTADO = []
  isLoading3.value = true
  let res = await m_modulo.get_config({ empresa: empresa_actual.value.id, agencia: agencia.agencia_codigo, modulo: MODULO })
  if (res.opciones) configuracion.value = JSON.parse(res.opciones)
  isLoading3.value = false
}

async function guardar() {

  await $toast.clear() // hide

  isLoading3.value = true
  m_modulo.guardar_config({
    modulo: MODULO,
    empresa: empresa_actual.value.id,
    agencia: agencia_actual.value.agencia_codigo,
    config: JSON.stringify(configuracion.value)
  })

  $toast.success("Configuración guardada", { position: 'bottom-right', timeout: 3000 })

  isLoading3.value = false
}

function añadir_precios(opcion, formas) {
  cmp_dialogo_precios.value.setPrecios(opcion, formas)
  cmp_dialogo_precios.value.mostrar()
}

function añadir_almacenes(almacenes) {
  cmp_dialogo_almacenes.value.setAlmacenes(almacenes)
  cmp_dialogo_almacenes.value.mostrar()
}

function set_precios_contado(seleccionados) {
  // configuracion.value.formas.CONTADO = seleccionados
  configuracion.value.formas.CONTADO = []
  Object.assign(configuracion.value.formas.CONTADO, seleccionados)
}

function set_precios_tarjeta(seleccionados) {
  configuracion.value.formas.TARJETA = []
  Object.assign(configuracion.value.formas.TARJETA, seleccionados)
}

function set_almacenes(seleccionados) {
  configuracion.value.almacenes = []
  Object.assign(configuracion.value.almacenes, seleccionados)
  // configuracion.value.almacenes = { ...seleccionados }
}

function quitar(opcion, item) {
  if (opcion == 1) {
    let toDelete = configuracion.value.formas.CONTADO.findIndex(el => el == item)
    configuracion.value.formas.CONTADO.splice(toDelete, 1)
  }

  if (opcion == 2) {
    let toDelete = configuracion.value.formas.TARJETA.findIndex(el => el == item)
    configuracion.value.formas.TARJETA.splice(toDelete, 1)
  }
}

function quitar_almacen(almacen) {
  // console.log(almacen.id);
  let toDelete = configuracion.value.almacenes.findIndex(el => el.id === almacen.id)
  // console.log(toDelete);
  configuracion.value.almacenes.splice(toDelete, 1)
}

onMounted(async () => {
  loadEmpresas()
})

provide('prov_set_precios', { set_precios_contado, set_precios_tarjeta })
provide('prov_set_almacenes', { set_almacenes })
</script>
<template lang="pug">
v-container.pa-2(fluid)
  v-row(dense)
    v-col(cols="2")
      div.gap-4.align-center
        div.text-h6.pa-2 Empresas registradas
        div.w20(v-if="isLoading1"): v-progress-linear(color="deep-purple-accent-4" indeterminate rounded height="5")

      v-list.pa-1.bg-main.border.rounded(v-model:selected="empresa_actual_pre" density="compact" color="primary" mandatory nav :disabled="isLoadingGlobal")
        v-list-item.bg-boton(v-for="item of listas.empresas" :key="item.nombre" :value="item")
          div.gap-8.align-center
            i.mdi(:class="empresa_actual?.id === item.id ? 'mdi-record-circle-outline' : 'mdi-circle-small'")
            span.text-h6 {{ item.nombre }} {{ item.periodo }}

    v-col(cols="2")
      div.gap-4.align-center
        div.text-h6.pa-2 Agencias
        div.w20(v-if="isLoading2"): v-progress-linear(color="deep-purple-accent-4" indeterminate rounded height="5")

      v-list.pa-1.bg-main.border.rounded(v-model:selected="agencia_actual_pre" color="primary" mandatory nav max-height="calc(100vh - 140px)" :disabled="isLoadingGlobal")
        v-list-item.bg-boton(v-for="item of listas.agencias" :key="item.agencia_codigo" density="compact" :value="item")
          div.gap-8.align-center
            i.mdi(:class="agencia_actual?.agencia_codigo === item.agencia_codigo ? 'mdi-record-circle-outline' : 'mdi-circle-small'")
            div.gap-3.flex-column
              span.text-h6 {{ item.agencia }}
              span.text-caption.text-blue {{ item.agencia_codigo }}

    v-col(cols="8")
      v-container.pa-1(fluid)
        v-row(dense align="center")
          v-col(cols="12")
            div.gap-10
              div.gap-2.flex-column.px-2.pb-3

                template(v-if="existe")
                  div.gap-3.align-center.text-h5
                    span {{ agencia_actual.agencia_codigo }} - {{ agencia_actual.agencia }} 
                template(v-else)
                  span.text-h5 Sin configuración

                div.gap-4.align-center
                  span.text-caption Configuración del módulo
                  div.w20(v-if="isLoading3"): v-progress-linear(color="deep-purple-accent-4" indeterminate rounded height="5")
              v-spacer
              v-btn.mx-auto(prepend-icon="mdi-content-save" :disabled="!existe" @click="guardar()") Guardar

        v-divider.mb-3

        v-row(dense)
          v-col(cols="3")
            div.bg-blue-grey-lighten-5.rounded-b
              div.bg-blue-grey-lighten-4.gap-0.pa-2.rounded-t
                span.text-h6.font-weight-bold Tipo de cliente
              div.px-2.py-1
                v-checkbox(
                  v-for="tipo of listas.tipos_clientes" 
                  :key="tipo.id" 
                  v-model="configuracion.tipos_clientes" 
                  :value="tipo"
                  :label="tipo.nombre"
                  )

          v-col(cols="5")
            div.bg-blue-grey-lighten-5.rounded-b
              div.bg-blue-grey-lighten-4.gap-0.pa-2.rounded-t.align-center
                span.text-h6.font-weight-bold Formas de ventas del módulo

              div.gap-5.w-100
                div.gap-0.pa-2.flex-column.w-50
                  div.gap-0.pa-2.pt-1.justify-space-between.pa-1.align-center
                    span.text-h6.font-weight-bold CONTADO
                    span.text-blue.text-h6.cursor-pointer(@click="agencia_actual && añadir_precios(1, configuracion.formas?.CONTADO)") Añadir

                  div.gap-4.flex-column.text-h6
                    div.pa-2.border.rounded.justify-space-between.gap-5.align-center(v-for="forma of configuracion.formas?.CONTADO" :key="forma")
                      span {{ forma.nombre }}
                      span.text-caption.text-error.cursor-pointer(@click="quitar(1, forma)") Quitar

                v-divider(vertical)

                div.gap-0.pa-2.flex-column.w-50
                  div.gap-0.pa-2.pt-1.justify-space-between.pa-1.align-center
                    span.text-h6.font-weight-bold TARJETA DE CREDITO
                    span.text-blue.text-h6.cursor-pointer(@click="agencia_actual && añadir_precios(2, configuracion.formas?.TARJETA)") Añadir

                  div.gap-4.flex-column.text-h6
                    div.pa-2.border.rounded.justify-space-between.gap-5.align-center(v-for="forma of configuracion.formas?.TARJETA" :key="forma")
                      span {{ forma.nombre }}
                      span.text-caption.text-error.cursor-pointer(@click="quitar(2, forma)") Quitar

          v-col(cols="4")
            div.bg-blue-grey-lighten-5.rounded-b
              div.bg-blue-grey-lighten-4.gap-0.pa-2.rounded-t.align-center
                span.text-h6.font-weight-bold Almacenes activos
                v-spacer
                span.text-h6.text-blue-accent-4.font-weight-bold.cursor-pointer(
                  @click="agencia_actual && añadir_almacenes(configuracion.almacenes)"
                  ) Añadir

              div.gap-0.pa-2.flex-column

                v-checkbox.ml-auto(v-model="configuracion.transito" label="Columna de tránsito")

                div.mt-2.text-h6.gap-4.flex-column
                  draggableComponent(v-model="configuracion.almacenes" item-key="id" ghost-class="ghost" :animation="200")
                    template(#item="{ element }")
                      div.mb-1.pa-2.border.rounded.justify-space-between.gap-0
                        span {{ element.almacen_codigo }} - {{ element.almacen }}
                        span.text-caption.text-error.cursor-pointer(@click="quitar_almacen(element)") Quitar

        //- v-divider.my-5

        v-row(dense)
          //- v-col
          //- pre.text-caption {{ empresa_actual }}
          //- hr.my-2
          //- pre.text-caption {{ agencia_actual }}
          //- hr.my-2
          //- pre.text-caption configuracion: {{ configuracion }}
          v-col
            dialogo_precios(ref="cmp_dialogo_precios" :lista="listas.precios")
          v-col
            dialogo_almacenes(ref="cmp_dialogo_almacenes" :lista="listas.agencias" :agencia="agencia_actual?.agencia_codigo")

</template>
<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>