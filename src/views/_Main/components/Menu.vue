<script>
export default { name: 'menu-main' }
</script>
<script setup>
import { ref, watch, computed, onMounted, toRaw, inject } from 'vue';
import { useRouter } from 'vue-router'

// import { $socket } from '@/plugins';
// import alerta_vue from './Alertas.vue'
import mini_JCH from '@/assets/images/mini_JCH.png'
import mini_CAR from '@/assets/images/mini_CAR.png'

const router = useRouter()

const currentRouteName = computed(() => router.currentRoute.value.name)

function setMenuInicial() {
  // tab.value = -1
  let control = null
  let menu_actual = null

  if (sesion.value.modulos) {
    sesion.value.modulos.forEach(modu => {
      if (modu.modulo_route_name == currentRouteName.value) control = modu
    })
  }
  if (sesion.value.modulos) {
    sesion.value.modulos.forEach(modu => {
      modu.grupos.forEach(grup => {
        grup.menus.forEach(menu => {
          if (menu.menu_route_name == currentRouteName.value) {
            control = modu
            menu_actual = menu
          }
        });
      });
    });
  }

  if (control) {
    // console.log(control);
    // console.log(menu_actual);
    setMenus({ modulo: control })
  }
  if (menu_actual) {
    if (!rutas.value.find(item => item.menu_route_name == menu_actual.menu_route_name))
      rutas.value.push(menu_actual)
    // tab.value = menu_actual
  }
}

watch(
  () => currentRouteName.value,
  () => {
    tab.value = -1
    setMenuInicial()
  },
  { deep: true, inmmediate: true }
)

const { sesion, hash, setMenusApp } = inject('Menus')

const propes = defineProps({
  modo: { type: String, default: 'top' },
})

const modulo_actual = ref({})

function setMenus({ modulo }) {
  modulo_actual.value = modulo
}

function ir(mod) {
  setMenusApp({ modulo: toRaw(mod) })
  router.push({ name: mod.modulo_route_name })
}

onMounted(() => {
  if (propes.modo == "top") setMenuInicial()
})


const tab = ref(null)
const rutas = ref([])
function stopEvent() { }

function eliminarRuta(route_name) {
  tab.value = -1
  let res = rutas.value.findIndex(item => item.menu_route_name == route_name)
  rutas.value.splice(res, 1)
  router.push({ name: 'inicio', replace: true })
}

// function forceLogout() {
//   $socket.emit("force-logout")
// }

const nombre = computed(() => {
  if (!sesion.value.usuario.nombre) return ''
  let completo = sesion.value.usuario.nombre
  let nombre = completo.split(" ")[0].toLowerCase()
  return nombre.charAt(0).toUpperCase() + nombre.slice(1)
})

defineExpose({ setMenus, rutas })
</script>
<template lang="pug">
div(v-if="hash")
  v-app-bar.bg-appbar(v-show="modo == 'top'" density="compact" height="54" :extension-height="38" flat)
    template(v-if="rutas.length > 0" #extension)
      v-tabs.w-100(v-model="tab" bg-color="#e4eeff" show-arrows center-active density="compact" height="30")
        v-tab.px-3.pr-0(
          v-for="(item, idx) of rutas" :key="item.menu_route_name"
          :value="idx" tile :to="{ name: item.menu_route_name, params: { hash } }" :rounded="0" @click.prevent="stopEvent"
        ) 
          v-icon(start) {{ item.menu_icono }}
          span {{ item.menu_titulo }}
          v-btn.mt-0.mx-2(icon="mdi-close mdi-14px" size="22px" color="amber-darken-3" variant="text" @click.prevent="eliminarRuta(item.menu_route_name)") 

    div.gap-10.px-0.align-center
      v-btn(:to="{ name: 'inicio', params: { hash } }" icon="mdi-home mdi-20px" fill-height rounded="0")
    template(v-if="Object.keys(modulo_actual).length > 0")
      v-btn.ml-2(variant="tonal" append-icon="mdi-chevron-right" :to="{ name: modulo_actual.modulo_route_name }") {{ modulo_actual.modulo_titulo }}
      div.gap-5.mx-2
        v-menu(v-for="grupo of modulo_actual.grupos" :key="`que_${grupo}`")
          template(#activator="{ props }")
            v-btn(color="primary" v-bind="props" append-icon="mdi-menu-down") {{ grupo.menu_grupo }}
          v-list.py-0.elevation-1(:lines="true" density="compact")
            code(v-for="(menu, index) of grupo.menus" :key="index" :to="{ name: menu.menu_route_name }")
              v-list-item.pa-0.pl-1.pr-3(:to="{ name: menu.menu_route_name }")
                template(#prepend)
                  div.pl-2.pr-3
                    v-icon(size="14" :icon="menu.menu_icono")
                span.text-h6 {{ menu.menu_titulo }}
              v-divider
    v-spacer
    div.gap-10.px-3.align-center

      img.rounded(:src="sesion.conexion.empresa_abrev == 'JCH' ? mini_JCH : mini_CAR" alt="logo" height="24")

      v-menu()
        template(#activator="{ props }")
          v-btn.text-caption(v-bind="props" prepend-icon="mdi-account" append-icon="mdi-chevron-down" variant="text") Hola, 
            span.font-weight-bold {{ nombre }}
        div.gap-5.flex-column.pa-2.bg-boton.border.rounded.w200.mt-1.text-h6
          span.text-caption Usuario: 
          span.font-weight-bold.mb-1 {{ sesion.usuario.nombre }}
          span.text-h6 Codigo de vendedor:
          span.font-weight-bold.mb-1 {{ sesion.usuario.vendedor }}
          span.text-caption Empresa:
          span.font-weight-bold.mb-1 {{ sesion.conexion.empresa }} - {{ sesion.conexion.periodo }}
          span.text-caption Agencia:
          span.font-weight-bold.mb-1 {{ sesion.agencia.codigo }} - {{ sesion.agencia.nombre }}
          v-divider.my-1
          v-btn(append-icon="mdi-logout" variant="tonal" color="orange" :to="{ name: 'logout', params: { hash } }") Cerrar sesión
      //- alerta_vue

      //- div(v-if="$socket.connected")
        v-btn(v-tippy content="Force logout" icon="mdi-flash mdi-16px" color="amber" variant="tonal" size="26" @click="forceLogout")
      //- v-btn(append-icon="mdi-logout" variant="tonal" color="orange" :to="{ name: 'logout', params: { hash } }") Cerrar sesión


  div(v-show="modo == 'inicio'")

    div.gap-15.justify-center.flex-wrap
      template(v-for="modu in sesion.modulos")
        div.div-menu.div-activo.gap-10.align-center.justify-center.flex-column.text-center.pa-2(v-if="modu.grupos.length >= 1" :key="`mod_${modu.modulo_id}`" @click="ir(modu)")
          v-icon(:icon="modu.modulo_icono" size="16")
          span.text-h5 {{ modu.modulo_titulo }}
          span.text-h6.text-grey-lighten-2 {{ modu.modulo_descripcion }}
        div.div-menu.div-disabled.gap-10.align-center.justify-center.flex-column.text-center.pa-2(v-else :key="`unmod_${modu.modulo_id}`")
          v-icon(:icon="modu.modulo_icono" size="16")
          span.text-h5 {{ modu.modulo_titulo }}
          span.text-h6 {{ modu.modulo_descripcion }}  
</template>
<style scoped lang="scss">
.div-menu {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  color: #ffffff;
  transition: all ease .2s;

  &.div-activo {
    cursor: pointer;
    background-color: #3346cd !important;

    &:hover {
      background-color: #4659ec;
      transform: translateY(-7px);
      box-shadow: 0 7px 10px 0 rgb(0 0 0 / .2);
    }
  }

  &.div-disabled {
    cursor: default;
    background-color: #cccccc
  }
}
</style>
