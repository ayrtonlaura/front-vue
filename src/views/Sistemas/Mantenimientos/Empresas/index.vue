<script>
export default { name: 'sistemas-mantenimientos-empresas' }
</script>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { AgenciaModel, EmpresaModel, PrecioModel } from '@/models'
// import { nextTick } from 'vue'

const m_empresa = new EmpresaModel()
const m_precio = new PrecioModel()
const m_agencia = new AgenciaModel()

const grupos_lista = ref([])
const periodos_lista = ref([])

const grupo_actual = ref([])
const periodo_actual = ref([])
const empresa_actual = ref({})

const isLoading1 = ref()
const isLoading2 = ref()
const isLoading3 = ref()

const gridApi_Precios = ref()
const gridApi_Agencias = ref()

const readyGridPrecios = params => {
  gridApi_Precios.value = params.api
}
const readyGridAgencias = params => {
  gridApi_Agencias.value = params.api
}

const columnDefs_precios = ref([
  { field: 'codigo', width: 90, headerCheckboxSelection: true, checkboxSelection: true },
  { field: 'descripcion', flex: 1 }
])

const columnDefs_agencias = ref([
  { field: 'codigo', width: 90, headerCheckboxSelection: true, checkboxSelection: true },
  { field: 'descripcion', flex: 1 }
])

watch(
  () => grupo_actual.value,
  item => {
    loadPeriodos(item[0].abreviatura)
  }
)

watch(
  () => periodo_actual.value,
  v => {
    if (v.length == 0) return
    loadEmpresa(v[0].id)
  }
)

async function loadPeriodos(abreviatura) {
  clear_precios_selected()
  // console.log(abreviatura);
  empresa_actual.value = {}
  periodo_actual.value = []
  periodos_lista.value = []
  // data_agencias.value = []
  // data_precios.value = []
  isLoading2.value = true
  periodos_lista.value = await m_empresa.periodos_por_abreviatura({ abreviatura })
  isLoading2.value = false
}

const data_agencias = ref([])
const data_precios = ref([])

async function loadEmpresa(id) {
  empresa_actual.value = {}
  clear_precios_selected()

  isLoading3.value = true

  let result = await m_empresa.detalles({ id })

  empresa_actual.value = result

  let selected_precios = []
  if (empresa_actual.value.precios) selected_precios = empresa_actual.value.precios.split(',')
  selected_data(gridApi_Precios.value, selected_precios)

  let selected_agencias = []
  if (empresa_actual.value.precios) selected_agencias = empresa_actual.value.agencias.split(',')
  selected_data(gridApi_Agencias.value, selected_agencias)

  isLoading3.value = false
}

function selected_data(grid, arr) {
  let selected = []
  grid.forEachNode(node => {
    if (arr.includes(node.data.codigo)) selected.push(node)
  })
  grid.setNodesSelected({ nodes: selected, newValue: true })
}

function clear_precios_selected() {
  gridApi_Precios.value.forEachNode(node => {
    gridApi_Precios.value.setNodesSelected({ nodes: [node], newValue: false })
  })
  gridApi_Agencias.value.forEachNode(node => {
    gridApi_Agencias.value.setNodesSelected({ nodes: [node], newValue: false })
  })
}

const loadGrupos = async () => (grupos_lista.value = await m_empresa.listar())
const loadPrecios = async () => (data_precios.value = await m_precio.listar())
const loadAgencias = async () => (data_agencias.value = await m_agencia.listar())

onMounted(() => {
  isLoading1.value = true
  loadGrupos()
  loadPrecios()
  loadAgencias()
  isLoading1.value = false
})

async function guardar() {
  let agencias_seleccionadas = gridApi_Agencias.value.getSelectedRows()
  let precios_seleccionados = gridApi_Precios.value.getSelectedRows()

  let params = {
    empresa: empresa_actual.value,
    agencias: agencias_seleccionadas.map(item => item.codigo),
    precios: precios_seleccionados.map(item => item.codigo)
  }

  let g = await m_empresa.guardar(params)
  console.log(g)
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
        v-row(dense)
          v-col(cols="10")

            div.gap-2.flex-column.px-2.pb-3
              span.text-h5 {{ empresa_actual.nombre || 'Sin seleccion' }} {{ empresa_actual.periodo || '' }}
              div.gap-4.align-center
                span.text-caption Empresa actual 
                div.w20(v-if="isLoading3"): v-progress-linear(color="deep-purple-accent-4" indeterminate rounded height="5")

            div.gap-10
              div.gap-10.flex-column.w350.border.rounded.pa-3
                div.gap-10.flex-column
                  span.text-h6.text-decoration-underline Configuración
                  v-checkbox(v-model="empresa_actual.estado" label="Activo" true-value="A" false-value="I")
                  div.gap-10
                    v-text-field.text-center(v-model="empresa_actual.hostname" readonly label="Hostname")
                      template(#label="{label}")
                        div.gap-2(style="padding-top:2px")
                          v-icon(icon="mdi-lock mdi-12px text-grey-darken-2")
                          span.text-h6 {{ label }}

                    v-text-field.text-center(v-model="empresa_actual.base_comercial" readonly label="Base comercial")
                      template(#label="{label}")
                        div.gap-2(style="padding-top:2px")
                          v-icon(icon="mdi-lock mdi-12px text-grey-darken-2")
                          span.text-h6 {{ label }}

                    v-text-field.text-center(v-model="empresa_actual.base_contable" readonly label="Base contable")
                      template(#label="{label}")
                        div.gap-2(style="padding-top:2px")
                          v-icon(icon="mdi-lock mdi-12px text-grey-darken-2")
                          span.text-h6 {{ label }}

                  div.gap-10
                    v-text-field.text-center(v-model="empresa_actual.abreviatura" readonly label="Abreviatura")
                      template(#label="{label}")
                        div.gap-2(style="padding-top:2px")
                          v-icon(icon="mdi-lock mdi-12px text-grey-darken-2")
                          span.text-h6 {{ label }}
                    v-text-field.text-center(v-model="empresa_actual.periodo" readonly label="Periodo (año)")
                      template(#label="{label}")
                        div.gap-2(style="padding-top:2px")
                          v-icon(icon="mdi-lock mdi-12px text-grey-darken-2")
                          span.text-h6 {{ label }}
                  div.gap-10.flex-column
                    v-text-field(v-model="empresa_actual.consolidado_palabras_excluir" label="Palabras a excluir")

                div.gap-10.flex-column.mt-4
                  span.text-h6.text-decoration-underline Lista de Precios

                  agGrid(
                    :column-defs="columnDefs_precios"
                    :data="data_precios"
                    row-selection="multiple"
                    style="width: 100%; height: 190px"
                    @grid-ready="readyGridPrecios"
                    )

              div.gap-10.flex-fill.flex-column.pl-2
                span.text-h6.text-decoration-underline Agencias

                agGrid(
                  :column-defs="columnDefs_agencias"
                  :data="data_agencias"
                  row-selection="multiple"
                  style="width: 100%; height: calc(100vh - 190px)"
                  @grid-ready="readyGridAgencias"
                  )

          v-col.gap-0(cols="2")
            v-btn.mx-auto(prepend-icon="mdi-content-save" @click="guardar()") Guardar
</template>
