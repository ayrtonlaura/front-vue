<script>
export default { name: 'atencion-clientes-reportes-agencias-transportes' }
</script>
<script setup>
import { ref, watch } from 'vue'
// import { $eventBus } from '@/plugins'
import { TransporteModel } from '@/models'
// import CmpBorrador from './components/cmpBorrador.vue'

// import { useModuloStore } from '@/stores/MenuModulo'
// const moduloStore = useModuloStore()

const filtro = ref('')
const gridTransportes = ref({})
const transportes = ref([])
const cmpBorradorRef = ref(null)
const m_transporte = new TransporteModel()

const readyTabla = async params => {
  gridTransportes.value = params.api
  loadTransportes()
}

async function loadTransportes() {
  // let base_comercial = moduloStore.empresa.base_comercial

  gridTransportes.value.setRowData([])
  gridTransportes.value.showLoadingOverlay()
  // transportes.value = await m_transporte.listar(base_comercial)
  gridTransportes.value.hideOverlay()
}

watch(filtro, async (newQuestion, _) => {
  gridTransportes.value.setQuickFilter(newQuestion)
  gridTransportes.value.redrawRows()
})

function createDraft() {
  cmpBorradorRef.value.showA()
}

const columnas = [
  { headerName: 'Código', field: 'codigo', width: 120, cellClass: 'justify-center codigo' },
  { headerName: 'RUC', field: 'ruc', width: 120, cellClass: 'justify-center' },
  { headerName: 'Descripción', field: 'nombre', flex: 1 },
  { headerName: 'Dirección', field: 'direccion', width: 350 },
  { headerName: 'Teléfono', field: 'telefono', width: 120, cellClass: 'justify-center' }
]

const detalles = ref(
  {
    codigo: null,

    usuario_creacion: 'LMVN',
    fecha_creacion: '00-mmm-0000 00:00',

    usuario_modificacion: '00-mmm-0000 00:00',
    fecha_modificacion: 'LMVN',

    grupos: [
      {
        titulo: 'Datos de la Unidad de Transporte',
        datos: {
          // Estado: 'Activo',
          Código: 'AV.VIGIL735',
          Nombre: 'TRANSPORTES VICTOR MANUEL E HIJOS E.I.R.L.',
          Documento: 'R.U.C. 20131321321',
          Dirección: 'AV.VIGIL NRO.735 TACNA TACNA TACNA',
          Telefonos: '915987654 / 01 5665498',
          Localidad: 'Tacna',
          Modalidad: 'Público',
          'Autorización MTC': '23M22000119E-23M2200',
          'Nro. TUCE': '15M21015312E'
        }
      },
      {
        titulo: 'Datos de la Unidad de Transporte',
        datos: {
          Marca: 'VOLVO',
          Placa: 'V2C796',
          Cubicaje: 0
        }
      },
      {
        titulo: 'Datos del Chofer',
        datos: {
          Nombre: 'JHON EDWIN MERLIN RAM',
          'Nro. Licencia': 'K47724433',
          Documento: '47724433',
        }
      }
    ]
  }
)

const onRowSelected = async (event) => {
  if (event.node.isSelected()) {
    let { codigo } = event.node.data
    await getDatos(codigo)
  }
}

async function getDatos(codigo) {
  // $eventBus.emit('blocking', { mensaje: 'Leyendo datos del usuario..' })
  // detalles.value = {}
  // let base_comercial = moduloStore.empresa.base_comercial
  // detalles.value = await m_transporte.detalles(base_comercial, codigo)
  // $eventBus.emit('blocking', false)
}
</script>
<template lang="pug">
div
  //- CmpBorrador(ref="cmpBorradorRef")
  v-container.py-2(fluid)
    v-row(dense)
      v-col(cols="9")
        div.gap-10.align-center
          div.w250
            VFiltroInput(v-model="filtro" placeholder="Filtrar resultados..." )
          v-spacer
          v-btn(variant="tonal" prepend-icon="mdi-file-settings-outline mdi-14px" disabled @click="createDraft()") Crear borrador
          v-btn(color="blue" variant="tonal" prepend-icon="mdi-refresh mdi-16px" @click="loadTransportes()") Refrescar lista
        agGrid.mt-1.lista(
          :column-defs="columnas"
          :data="transportes"
          :filtro="filtro"
          row-selection="single"
          :suppress-copy-rows-to-clipboard="true"
          :suppress-row-click-selection="false"
          style="width: 100%; height: calc(100vh - 150px)"
          @grid-ready="readyTabla"
          @row-selected="onRowSelected"
        )
        div.text-h6.gap-0.align-center
          v-spacer
          span.pt-3.text-grey-darken-5 &ndash; {{ transportes.length }} registros &ndash;

      v-col(cols="3")

        //- BoxTexto.py-5.mt-5(texto="Seleccione una fila para mostrar sus detalles" icono="mdi-cursor-default-click-outline" :icono_size="20" v-if="!detalles.codigo")

        div.boton.rounded.flex-column.py-2.px-4(style="overflow-y: auto; max-height: calc(100vh - 120px);")

          div(v-for="(linea) of detalles.grupos" :key="linea")
            span.text-h6.text-black.font-weight-bold {{ linea.titulo }}
            div.ma-2.gap-7.flex-column.mb-3
              div(v-for="(row, k) of linea.datos" :key="k")
                div.gap-10.align-center.ml-2
                  span.text-h6.w90.text-right.text-grey-darken-1 {{ k }}:
                  span.text-h6.text-black {{ row }}

          div.mt-5.bg-grey-lighten-2.pa-2.rounded.gap-10.justify-space-around.text-caption
            div.gap-2.flex-column
              span Creación: 
              span {{ detalles.fecha_creacion }} &ndash; {{ detalles.usuario_creacion }}
            div.gap-2.flex-column
              span Modificación:
              span {{ detalles.fecha_modificacion }} &ndash; {{ detalles.usuario_modificacion }}

</template>
<style scoped>
:deep(.lista .codigo) {
  font-size: 11px;
  font-variation-settings: 'wght' 550;
  background-color: rgba(86, 148, 255, 0.1)
}
</style>
