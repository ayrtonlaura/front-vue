<script setup>
import { inject, ref, watch } from 'vue'
import { ClienteModel } from '@/models'

const emit = defineEmits(['update:modelValue'])
let { sesion } = inject('Menus')
const m_cliente = new ClienteModel()

defineProps({
  modelValue: {
    type: Object,
    default: null
  }
})

const show = ref(false)
const lista = ref([])
const filtro = ref('')
const error = ref('')
const q = ref('')

const columnas = [
  {
    headerName: 'RUC', field: 'codigo',
    width: 120,
    cellClass: 'justify-center'
  },
  {
    headerName: 'Razón social',
    field: 'nombre',
    flex: 1,
    // comparator: (a, b) => (a == b ? 0 : a > b ? 1 : -1),
    sortable: true
  }
]

const gridApi = ref(null)
const readyGrid = params => (gridApi.value = params.api)

function aceptar() {
  let clienteB = gridApi.value.getSelectedRows()
  if (clienteB.length == 0) return
  emit('update:modelValue', clienteB[0])
  show.value = false
}

function limpiar() {
  emit('update:modelValue', {})
}

watch(
  () => filtro.value,
  async (newQuestion) => {
    gridApi.value.setQuickFilter(newQuestion)
    gridApi.value.redrawRows()
  },
  {
    inmediate: true
  }
)

async function buscar() {
  let texto = q.value.trim()
  if (texto.length < 3) {
    error.value = 'Debe escribir por lo menos 3 letras'
    return
  } else {
    error.value = ''
    gridApi.value.setGridOption('rowData', [])
    gridApi.value.showLoadingOverlay()
    let ret = await m_cliente.busqueda_libre({ q: q.value, empresa: sesion.value.conexion.id })
    lista.value = ret.data
    gridApi.value.hideOverlay()
  }
}

</script>
<template lang="pug">
div
  div.gap-0.flex-column.border-b(style="border-color: #999 !important; cursor: pointer;")
    span.text-h6.text-grey-darken-2(style="margin-bottom: 1px;") Cliente
    div.gap-0
      div.gap-10.text-truncate.align-center.justify-space-between.flex-fill.px-2(@click="show = true")
        template(v-if="modelValue.codigo")
          span.text-truncate.text-h5.text-black(style="font-size: 13px !important") {{ modelValue.nombre }}
        template(v-else)
          span.text-h5.text-blue(style="font-size: 13px !important") - Todos los clientes -
        i.mdi.mdi-magnify
      template(v-if="modelValue.codigo")
        v-btn(icon="mdi-window-close mdi-16px" size="26" variant="tonal" color="primary" @click="limpiar()")

  v-dialog(v-model="show" persistent width="600" eager no-click-animation)
    v-card
      v-card-title.py-1.px-3
        div.gap-10.justify-space-between.align-center
          span.text-h5 Búsqueda de clientes
          v-spacer
          v-btn(color="grey-darken-1" icon="mdi-window-close" size="x-small" variant="tonal" @click="show = false")
      v-divider
      v-card-text.pa-1
        v-container.pa-1
          v-row(dense)
            v-col.gap-8.flex-column(cols="12")
              div.gap-10.align-center
                v-text-field(
                  v-model="q" 
                  label="Buscar por nombre o RUC" hint="Escriba por lo menos 3 letras" persistent-hint 
                  :error-messages="error" @keyup.enter="buscar"
                )
                v-btn(prepend-icon="mdi-magnify" variant="tonal" @click="buscar()") Buscar

              agGrid(
                :column-defs="columnas"
                :data="lista"
                :filtro="filtro"
                :suppress-row-click-selection="false"
                row-selection="multiple"
                style="width: 100%; height: 300px"
                @grid-ready="readyGrid"
              )

              div.gap-10.align-center
                div.w230.ml-auto
                  v-filtro-input(v-model="filtro" placeholder="Filtrar Clientes")
                v-spacer
                v-btn.px-4.mx-auto(prepend-icon="mdi-check" @click="aceptar()") Seleccionar
            
</template>
<style scoped>
.lista_marcas {
  font-size: 11px;
  line-height: 14px;
}
</style>
