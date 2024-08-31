<script>
export default { name: 'cmp-clientes' }
</script>
<script setup>
import { ref, inject, reactive, provide, computed, watch } from 'vue'
import dialogo_cliente_buscar from './dialogos/dialogo_cliente_buscar.vue'
import dialogo_cliente_crear from './dialogos/dialogo_cliente_crear.vue'
import { ClienteModel } from '@/models'
import { $toast } from '@/plugins'

const { sesion } = inject('Menus')

const {
  // modo, toggle,
  carrito,
  Sw_limpiarCarrito
} = inject('prov_carrito')

provide()

const cmpDialogoClienteBuscar = ref()
const cmpDialogoClienteCrear = ref()

const m_clientes = new ClienteModel()

const isLoading = ref(false)
const sw_crear_cliente = ref(false)

const busqueda = reactive({
  q: '',
  tipo: null,
  resultados: []
})

const form_ok = computed(() => {
  if (busqueda.tipo) return true
  return false
})

const cliente_ok = computed(() => {
  if (!carrito.cliente.vendedor_codigo) return false
  if (['ZZZZ', sesion.value.usuario.vendedor].includes(carrito.cliente.vendedor_codigo)) return true
  return false
})

const cliente_tipo_ok = computed(() => {
  if (carrito.cliente.tipo_codigo == '03') return true
  return false
})

async function buscar() {
  busqueda.resultados = []
  carrito.cliente = {}

  $toast.clear() // hide

  let letras = 4

  if (busqueda.q.trim() == "") return $toast.error("La búsqueda no puede estar vacía", { position: 'top-right', timeout: 3000 })
  if (busqueda.q.length < letras) return $toast.error(`El documento debe tener al menos ${letras} caracteres`, { position: 'top-right', timeout: 3000 })

  isLoading.value = true
  let ret = await m_clientes.buscar({ q: busqueda.q, empresa: sesion.value.conexion.id, tipo: busqueda.tipo })
  if (ret.size == 0 && !ret.ok)
    $toast.error(ret.mensaje, { position: 'top-right', timeout: 3000 })

  if (ret.ok) {
    if (ret.size == 0) {
      $toast.error("Sin resultados encontrados", { position: 'top-right', timeout: 3000 })
      sw_crear_cliente.value = true
      cmpDialogoClienteBuscar.value.show = false
    }


    if (ret.size == 1) {
      Object.assign(carrito.cliente, ret.data[0])
      cmpDialogoClienteBuscar.value.show = false
    }

    if (ret.size > 1) {
      $toast.success(ret.size + " encontrados", { position: 'top-right', timeout: 3000 })
      busqueda.resultados = ret.data
      cmpDialogoClienteBuscar.value.show = true
    }
  }

  isLoading.value = false

}

async function show_crear_cliente() {
  cmpDialogoClienteCrear.value.show = true
}

const tipos_cliente = reactive([
  { id: 1, descripcion: 'DNI - Documento Nacional de Identidad' },
  { id: 6, descripcion: 'RUC - Registro Único de Contribuyentes' },
  { id: 4, descripcion: 'CE - Carnet de Extranjería' },
])

provide('prov_clientes', { busqueda, buscar, tipos_cliente, isLoading })

watch(() => Sw_limpiarCarrito.value, (v) => {
  if (v) {
    console.log('limpio: cliente: tipo doc y numero de documento');
    // cmp_forma_precio.value = null
    busqueda.tipo = null
    busqueda.q = null
    sw_crear_cliente.value = false
  }
}, {
  deep: true
})

defineExpose({
  cliente_ok,
  cliente_tipo_ok
})
</script>
<template lang="pug">
div

  div.p-relative.normal.pa-3

    dialogo_cliente_buscar(ref="cmpDialogoClienteBuscar")
    dialogo_cliente_crear(ref="cmpDialogoClienteCrear")

    template(v-if="!carrito.cliente.codigo")
      div.gap-10.align-end
        div.w105
          v-select(
            v-model="busqueda.tipo"
            label="Tipo Doc." :items="tipos_cliente" :return-object="false" placeholder="Elegir opción"
          )
        v-text-field(
          v-model="busqueda.q" 
          :disabled="!form_ok" 
          :loading="isLoading"
          label="Buscar cliente" 
          placeholder="Ingrese RUC o DNI"
          @keyup.enter="buscar()"
        )
        v-btn(
          :loading="isLoading"
          :disabled="!form_ok"
          variant="tonal" icon="mdi-magnify mdi-16px" size="32" 
          @click="buscar()" 
          )

      div.gap-2.flex-column.align-center.py-4.text-grey-darken-1
        i.mdi.mdi-account-off.mdi-24px.text-grey-lighten-1.mb-1
        span.text-h6 Sin cliente
        span.text-caption Cliente no seleccionado

      div(v-if="sw_crear_cliente")
        div.text-center
          v-btn(color="success" prepend-icon="mdi-plus" @click="show_crear_cliente()") Crear nuevo cliente

    template(v-else)
      div.gap-5.flex-column.datos
        div.gap-10.align-center.justify-space-between
          span.text-h6.font-weight-bold Cliente seleccionado
          v-btn(variant="tonal" prepend-icon="mdi-account-search" @click="cmpDialogoClienteBuscar.show = true") Cambiar
        span.text-h6.text-grey-darken-1 Cliente:   
          span.font-weight-bold.text-black {{ carrito.cliente?.codigo }}
        span.text-h6.text-grey-darken-1 Nombre: 
          span.font-weight-bold.text-black {{ carrito.cliente?.nombre }}
        span.text-h6.text-grey-darken-1 Tipo: 
          span.font-weight-bold.text-black(:class="{ 'text-red': !cliente_tipo_ok }") {{ carrito.cliente.tipo }}
        span.text-h6.text-grey-darken-1 Vendedor: 
          span.font-weight-bold.text-black(:class="{ 'text-red': !cliente_ok }") {{ carrito.cliente.vendedor }}

        div.gap-5.justify-space-around.flex-wrap.mt-2
          v-btn(variant="tonal" prepend-icon="mdi-alert-circle" :disabled="!cliente_tipo_ok || !cliente_ok") Detalles
          v-btn(variant="tonal" prepend-icon="mdi-chart-box" :disabled="!cliente_tipo_ok || !cliente_ok") Estado Cuenta

</template>
<style scoped>
.mini {
  cursor: pointer;
  background-color: #dde8fd;
  box-shadow: 0 0 2px 0 rgb(196 217 255 / .2);
  border-radius: 5px;
  width: 30px;
  height: 200px;
  transition: background-color ease 0.2s;

  &:hover {
    background-color: #b0ccff;
  }

  div {
    width: 167px;
    display: inline-block;
    transform-origin: 0 0;
    margin-left: 2px;
    margin-bottom: -16px;
    transform: rotate(-90deg);
  }
}
</style>