<script>
export default { name: 'atencion-clientes-reportes-separaciones-stock' }
</script>
<script setup>
import {
  ref,
  provide,
  computed,
  reactive
  // , watch
} from 'vue'

import CmpCountFacturas from './Render/cmpCountFacturas.vue'
import cmpTableReporteVentas from './Render/cmpTableReporteVentas.vue'
import CmpVentasPopup from './Render/cmpVentasPopup.vue'
import { $yup } from '@/plugins'

const entorno = reactive({
  buscado: false,
  loading: false
})

//Modal
const cmpVentasPopup = ref(null)

const openPopup = message => {
  cmpVentasPopup.value.showA()
  console.log('Abrir evento:', message)
}

const records = ref([])

const totalRecords = ref(0) /// computed(() => records.value.length)

const schema = $yup.object().shape({
  Cliente: $yup.date().required(),
  Vendedor: $yup.date().required(),
  Producto: $yup.date().required(),
  Marca: $yup.date().required(),
  FecIni: $yup.mixed().test('isRequired', 'Fecha Inicio es requerida', function (value) {
    return typeof value === 'string' ? value.trim() !== '' : value !== null && value !== undefined
  }),
  FecFin: $yup.mixed().test('isRequired', 'Fecha Fin es requerida', function (value) {
    return typeof value === 'string' ? value.trim() !== '' : value !== null && value !== undefined
  })
})

const componenteVentas = ref(null)

const filtrar = a => {
  componenteVentas.value.filtro_inv = a
}

// const totalRecords = ref(0)
// const totalJohns = ref(0)

const totalDocs = computed(() => {
  // return records.value.length
  return 0
})

const totalNombres = computed(() => {
  // if (records.value.length == 0) return 0
  // let g = records.value.filter(item => item.agentfirstname.indexOf("JOHN") !== -1)
  // if (g.length > 0) return g.length
  return 0
})

// watch(
//   () => componenteVentas.value?.totalRecords,
//   newVal => {
//     if (newVal !== undefined) {
//       totalRecords.value = newVal
//     }
//   },
//   { immediate: true }
// )

// watch(
//   () => componenteVentas.value?.totalJohns,
//   newVal => {
//     if (newVal !== undefined) {
//       totalJohns.value = newVal
//     }
//   }
// )

async function loadData() {
  entorno.buscado = true
  entorno.loading = true
  records.value = []
  const response = await fetch('https://data.colorado.gov/resource/4ykn-tg5h.json')
    .catch(e => {
      // console.log(e.message);
    })
    .finally(() => {
      entorno.loading = false
    })
  records.value = await response.json()
  entorno.loading = false
}

provide('provide_ventas_por_cliente', { loadData, records, openPopup, totalDocs, totalNombres })
</script>
<template lang="pug">
v-container.py-2(fluid)
  CmpVentasPopup(ref="cmpVentasPopup" )
  v-row
    v-col(cols="9")
      //- Form(ref='formConsignaciones' v-slot="{ errors, meta }" :validation-schema="schema" )
      v-row(dense)
        v-col

          Form(v-slot="{ errors }" :validation-schema="schema" )
            v-row(dense) 

              v-col(cols="6")
                v-row
                  v-col.py-0(cols="12")    
                    Field(v-slot="{ field }" name="Cliente")
                      v-select(
                        placeholder="-Todos los Clientes-"
                        :error-messages="errors.Cliente"
                        v-bind="field"
                      )
                  v-col.py-0(cols="12") 
                    Field(v-slot="{ field }" name="Vendedor")
                      v-select(
                        placeholder="-Todos los Vendedores-"  
                        :error-messages="errors.Vendedor"
                        v-bind="field"
                      )
                  v-col.py-0
                    Field(v-slot="{ field }" name="Producto")
                      v-select(
                        placeholder="-Todos los Productos-"  
                        :error-messages="errors.Producto"
                        v-bind="field"
                      )
                  v-col.py-0
                    Field(v-slot="{ field }" name="Marca")
                      v-select(
                        placeholder="-Todas las Marcas-"  
                        :error-messages="errors.Marca"
                        v-bind="field"
                      ) 
              v-col(cols="4")
                v-container 
                  v-row.pt-3(dense)
                    v-col(cols="6")
                      Field(v-slot="{ field }" name="FecIni")
                        v-text-field(label="Fecha Inicio" type="date" :error-messages="errors.FecIni" v-bind="field")
                    v-spacer
                    v-col(cols="6")
                      Field(v-slot="{ field }" name="FecFin")
                        v-text-field( label="Fecha Final" type="date" :error-messages="errors.FecFin" v-bind="field")

                    v-col
                      label(class="header") Opciones segun atención

                      v-radio-group(inline).d-flex.flex-row
                        v-radio(label="Todo", value="one")
                        v-radio(label="Sin guía de atención")
              v-col(cols="2" class="d-flex justify-space-evenly flex-column")
                v-btn.w-100(
                  color="primary" prepend-icon="mdi-magnify" @click="loadData()" :disabled="entorno.loading"
                :loading="entorno.loading"
                ) Buscar

                v-btn.w-100( color="success" prepend-icon="mdi-microsoft-excel") Exportar

      v-row(dense)
        v-col(cols="12")

          v-box(v-if="!entorno.buscado" tipo="inicial" boton="Buscar registros")
          v-box(v-if="!entorno.loading && entorno.buscado && records.length == 0" tipo="no-data")
          v-box(v-if="entorno.loading" tipo="loading")        

          cmpTableReporteVentas(ref="componenteVentas")
    v-col(cols="3")
      div.d-flex.justify-center.gap-12(class="" :min-height="450")
        CmpCountFacturas(@filtrar="filtrar" )

</template>
