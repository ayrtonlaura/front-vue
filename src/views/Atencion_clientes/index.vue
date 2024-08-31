<script>
export default { name: 'atencion-cliente-inicio' }
</script>
<script setup>
import { ref, toRaw, reactive } from 'vue'
import { $moment } from '@/plugins';
import { GuiasModel } from '@/models';

const m_guias = new GuiasModel()

const busqueda = reactive({
  avanzada: false,
  // almacen: [],
  // cliente: {},
  // tipoCliente: [],
  // tipoMovimiento: [],
  fecha: [$moment().utc(-5), $moment().utc(-5)],
  // base: sesion.base_comercial
})

const rowDataDos = ref([])

async function test() {

  // console.log(busqueda);
  // console.log(toRaw(busqueda));

  rowDataDos.value = await m_guias.buscar(toRaw(busqueda))

}
</script>
<template lang="pug">
div
  span
  //- div.gap-10.flex-column.align-end.pa-4
    span.text-h5 Inicio
    v-btn(@click="test()") Test (fechas)
    v-fecha.w220(v-model="busqueda.fecha" titulo="Fecha")
    pre.my-5.text-caption {{ busqueda.fecha }}
</template>