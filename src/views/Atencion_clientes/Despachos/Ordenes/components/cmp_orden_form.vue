<script>
export default { name: 'cmp-ordenes-form' }
</script>
<script setup>
import { inject, ref } from "vue"
import renderCellGuia from './renders/render_cell_guia.vue'
import { $yup, $moment, $numeral } from '@/plugins'

const { orden_actual, mostrar_buscar_guias, entorno,
  onVerUbicacion, onVerDetalles,
  guardar_orden,
  actualizar_orden,
  cancelar_orden,
  loadings
} = inject("despachos")

const form_orden_validar = ref()

const schema = $yup.object().shape({
  chofer: $yup.string().required(),
  nota: $yup.string().optional().nullable(),
  guias: $yup.array().min(1)
})

const filtro = ref('')
const gridApi = ref()
const readyGrid = params => (gridApi.value = params.api)

const columnDefs = ref([
  { field: 'guia', hide: true },
  { field: 'cliente', hide: true },
  { field: 'movimiento', hide: true },
  { field: 'direccion', hide: true },

  {
    flex: 1,
    field: 'almacen',
    cellRenderer: renderCellGuia,
    cellRendererParams: params => {
      return {
        filtro: filtro.value,
        seleccionar: false,
        // quitar: true,
        // clicked: () => { },
        quitar: () => {
          params.node.setSelected(true)
          const sel = gridApi.value.getSelectedRows()
          gridApi.value.applyTransaction({ remove: sel })

          orden_actual.value.guias.splice(orden_actual.value.guias.indexOf(sel[0]), 1);
        },
        ver_ubicacion: () => {
          onVerUbicacion(params.data)
        },
        ver_detalles: () => {
          // onVerDetalles(params.data)
          onVerDetalles(params.data)
        }
      }
    },
    cellStyle: { display: 'inline-block', padding: '0' }
  },
])

async function guardar() {

  // Refresca la data, verificando validacion
  let tmpRows = []
  gridApi.value.forEachNode(node => tmpRows.push(node.data));
  orden_actual.value.guias = tmpRows

  const result = await form_orden_validar.value.validate()

  // console.log('valid', result.errors);

  if (result.valid) {

    if (orden_actual.value.id) {
      actualizar_orden(orden_actual.value)
    } else {
      guardar_orden(orden_actual.value)
    }

  }
}

defineExpose({ gridApi, form_orden_validar })
</script>
<template lang="pug">
div.bg-boton.pa-3.rounded-lg(style="border: 1px solid #e4eeff")
  Form(ref="form_orden_validar" v-slot="{ errors }" :validation-schema="schema")
    div.gap-15.align-center
      div.gap-5.align-center.w-100
        div.gap-5.flex-column(v-if="!orden_actual.id")
          span.text-h5(:class="{'text-grey-lighten-1': !loadings.en_creacion}") Nueva orden de despacho
        div.gap-5.flex-column(v-else)
          div.text-h5 Orden # 
            span.font-weight-bold {{ orden_actual.agencia_id }}-{{ $numeral(orden_actual.numeracion).format('000000') }}
          span.text-h6 {{ $moment(orden_actual.creado_en).format("DD/MMM/YYYY, HH:mm") }}
        v-spacer
        v-btn(prepend-icon="mdi-plus" :disabled="!loadings.en_creacion" @click="mostrar_buscar_guias()") Añadir guías

    //- pre.text-caption(style=" width: 10px;") {{ orden_actual }}

    div.pa-2.gap-10.align-center

      Field(v-model="orden_actual.chofer" name="chofer")
        div.w200
          v-autocomplete(
            v-model="orden_actual.chofer" 
            :items="entorno.choferes" 
            :return-object="false"
            label="Chofer" placeholder="Chofer" 
            item-value="id" item-title="nombre" 
            :error-messages="errors.chofer"
            :hide-details="true"
            :disabled="!loadings.en_creacion"
          )

      div.w140
        v-fecha-single(v-model="orden_actual.fecha" label="Fecha para despacho" :disabled="!loadings.en_creacion")

      v-text-field(v-model="orden_actual.nota" label="Nota" placeholder="Observaciones" :disabled="!loadings.en_creacion")

    Field(v-model="orden_actual.guias" name="guias")
      agGrid.noHeader(
        :class="{'aggrid-error' : errors.guias, 'aggrid-disabled': !loadings.en_creacion}"
        :column-defs="columnDefs"
        :include-hidden-columns-in-quick-filter="true"
        :data="orden_actual.guias"
        :filtro="filtro"
        style="width: 100%; height: calc(100vh - 270px)"
        :row-height="42"
        @grid-ready="readyGrid"
        )

    v-container.pt-2.pb-0.px-2(fluid)
      v-row(dense align="center")
        v-col(cols="5")  
          v-filtro-input(v-model="filtro" placeholder="Fitlrar guias..." :disabled="!loadings.en_creacion")
        v-spacer
        v-btn.px-4.mr-5(prepend-icon="mdi-undo" color="grey-darken-1" variant="tonal" :disabled="!loadings.en_creacion" @click="cancelar_orden()") Cancelar
        v-btn.px-4(append-icon="mdi-content-save" color="success" :loading="loadings.guardando" :disabled="!loadings.en_creacion" @click="guardar()") Guardar

</template>
<style>
.aggrid-disabled {
  opacity: 0.5 !important;
}

.aggrid-error {
  border: 1px solid #FF5252;
  border-radius: 6px !important;
}
</style>