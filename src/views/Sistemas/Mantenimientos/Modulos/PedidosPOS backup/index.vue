<script>
export default { name: 'sistemas-mantenimientos-precios-modulos' }
</script>
<script setup>
import { ref, watch, onMounted, computed } from "vue"
import dialogo_precios from "./components/dialogo_precios.vue";
import { EmpresaModel, sistemas_modulo_model, ClienteModel } from "@/models";

//#region - Declaracion de variables
const modulo_nombre = "Pedidos POS"
const m_empresa = new EmpresaModel()
const m_modulo = new sistemas_modulo_model()
const m_clientes = new ClienteModel()
// const m_precio = new PrecioModel()

const grupos_lista = ref([])
const periodos_lista = ref([])

const grupo_actual = ref([])
const periodo_actual = ref([])
const empresa_actual = ref({})

const isLoading1 = ref()
const isLoading2 = ref()
const isLoading3 = ref()

const config = ref({})

const existe = computed(() => {
  return !!empresa_actual.value.modulo_nombre
})

const lista_tipos = ref([])
//#endregion

watch(() => grupo_actual.value, (v) => {
  loadPeriodos(v[0].abreviatura)
})

watch(() => periodo_actual.value, (v) => {
  if (v.length == 0) return
  loadConfig(v[0])
})

async function loadGrupos() {
  isLoading1.value = true
  grupos_lista.value = await m_empresa.listar()
  isLoading1.value = false
}

async function loadPeriodos(abreviatura) {
  empresa_actual.value = {}
  periodo_actual.value = []
  periodos_lista.value = []
  isLoading2.value = true
  periodos_lista.value = await m_empresa.periodos_por_abreviatura({ abreviatura })
  isLoading2.value = false
}

async function loadConfig(v) {

  console.log(v);
  // TODO: cargar tipos de clientes por empresa
  lista_tipos.value = await m_clientes.get_tipos(v.id)

  empresa_actual.value = {}
  isLoading3.value = true
  let res = await m_modulo.get_config({ id: v.id, modulo: modulo_nombre })
  if (res.ok) empresa_actual.value = res.data
  isLoading3.value = false
}

async function guardar() {
  // console.log('guardar()');
  m_modulo.guardar_config()
  // m_empresa.guardar_modulo_config()
}

onMounted(() => {
  loadGrupos()
})

async function excel() {
  const response = await m_clientes.excel()

  var url = window.URL.createObjectURL(new Blob([response]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'reporte.xlsx')
  document.body.append(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)

}

</script>
<template lang="pug">
v-container.pa-2(fluid)
  v-row(dense)
    v-col(cols="2")
      div.gap-4.align-center
        div.text-h6.pa-2 Empresas registradas
        div.w20(v-if="isLoading1"): v-progress-linear(color="deep-purple-accent-4" indeterminate rounded height="5")

      v-list.pa-1.bg-main.border.rounded(v-model:selected="grupo_actual" density="compact" color="primary" mandatory nav)
        v-list-item.bg-boton(v-for="item of grupos_lista" :key="item.nombre" :value="item")
          div.gap-8.align-center
            i.mdi(:class="grupo_actual[0]?.nombre == item.nombre ? 'mdi-record-circle-outline' : 'mdi-circle-small'")
            span.text-h6 {{ item.nombre }}

    v-col(cols="2")
      div.gap-4.align-center
        div.text-h6.pa-2 Periodos
        div.w20(v-if="isLoading2"): v-progress-linear(color="deep-purple-accent-4" indeterminate rounded height="5")

      v-list.pa-1.bg-main.border.rounded(v-model:selected="periodo_actual" density="compact" color="primary" mandatory nav)
        v-list-item.bg-boton(v-for="item of periodos_lista" :key="item.periodo" :value="item")
          div.gap-8.align-center
            i.mdi(:class="periodo_actual[0]?.periodo === item.periodo ? 'mdi-record-circle-outline' : 'mdi-circle-small'")
            span.text-h6 {{ item.periodo }}

    v-col(cols="8")
      v-container.pa-1(fluid)
        v-row(dense align="center")
          v-col(cols="12")
            div.gap-10
              div.gap-2.flex-column.px-2.pb-3

                template(v-if="existe")
                  div.gap-3.align-center.text-h5
                    span {{ grupo_actual[0].nombre }} 
                    i.mdi.mdi-chevron-right
                    span {{ periodo_actual[0].periodo }} 
                    i.mdi.mdi-chevron-right
                    span {{ empresa_actual.modulo_nombre }}
                template(v-else)
                  span.text-h5 Sin configuración

                div.gap-4.align-center
                  span.text-caption Configuración del módulo
                  div.w20(v-if="isLoading3"): v-progress-linear(color="deep-purple-accent-4" indeterminate rounded height="5")
              v-spacer
              v-btn.mx-auto(prepend-icon="mdi-content-save" @click="excel()") Test Excel
              v-btn.mx-auto(prepend-icon="mdi-content-save" :disabled="!existe" @click="guardar()") Guardar

        v-divider.mb-3

        v-row(dense)
          v-col
            div.gap-25
              div.gap-4.flex-column
                span.text-h6 Lista de precios / Tipo de precio / Tipo de cliente
                span.text-caption Los precios si no están configurados, <u>no tienen retricciones</u>
              v-spacer
              div.gap-4.flex-column
                v-btn(color="green" variant="tonal" prepend-icon="mdi-plus" :disabled="!existe") Añadir

            div.text-h6.gap-4.flex-column.mt-3.pl-5
              span.font-weight-bold.text-indigo JCH COMERCIAL 
              div
                div.gap-10.align-center.py-1
                  span.pl-4.font-weight-bold LIM PRECIO PREMIUM
                  v-btn(variant="tonal" density="comfortable") Editar
                div.pl-8.gap-4.flex-column
                  span PUBLICO FINAL
                  span TALLER

              div.mt-2
                div.gap-10.align-center.py-1
                  span.pl-4.font-weight-bold LIM PRECIO EVO1
                  v-btn(variant="tonal" density="comfortable") Editar
                div.pl-8.gap-4.flex-column
                  span PUBLICO FINAL
                  span TALLER
                  span DISTRIBUIDOR
                  span FLOTA
                  span SUPERMERCADOS

                  pre.text-caption {{ lista_tipos }}

          v-divider.mx-2(vertical)

          v-col.gap-10.flex-column
            div.gap-25
              div.gap-4.flex-column
                span.text-h6 Forma de pago / Tipo de precio
                span.text-caption Las formas de pago si no están configurados, <u>no tienen retricciones</u>
              v-spacer
              div.gap-4.flex-column
                v-btn(color="green" variant="tonal" prepend-icon="mdi-plus" :disabled="!existe") Añadir

            div.text-h6.gap-4.flex-column.pl-5
              div
                div.gap-10.align-center.py-1
                  span.font-weight-bold.text-indigo CONTADO
                  v-btn(variant="tonal" density="comfortable") Editar

                div.pl-4.gap-4.flex-column
                  span LIM PRECIO PREMIUM
                  span PROV PRECIO PUBLICO FINAL

        v-divider.my-5

        v-row(dense)
          v-col
            pre.text-caption {{ empresa_actual }}

            pre.text-caption config: {{ config }}

            dialogo_precios
</template>
