<script setup>
import { ref, watch, provide, computed } from 'vue';
import { $http, $auth, $socket } from '@/plugins';
import { useRoute } from 'vue-router'
import Menu from './components/Menu.vue'
import DialogoForceLogout from './components/DialogoForceLogout.vue'
import Vidle from 'v-idle'

import { useRouter } from 'vue-router'
// const { hash } = inject('Menus')

const router = useRouter()

const duracion_sesion = ref(600) // segundos

const myRoute = useRoute()
const hash = ref()
const sesion = ref({})

const force_logout_vue = ref()

const blocking_vue = ref()
const bloquear = (mensaje) => blocking_vue.value.bloquear(mensaje)
const desbloquear = () => blocking_vue.value.desbloquear()
provide('bloquear', { bloquear, desbloquear })

const menu_vue = ref()
const setMenusApp = ({ modulo }) => menu_vue.value.setMenus({ modulo })

const rutas = computed(() => (menu_vue.value) ? menu_vue.value.rutas : null)
const rutas_includes = computed(() => (rutas.value) ? rutas.value.map(item => item.menu_route_name) : [])

watch(() => myRoute.params, async (v) => {
  if (v) {
    if (v.hash) {
      hash.value = v.hash
      let d = $auth.getUserSession(v.hash)
      $http.defaults.headers.common['Authorization'] = 'bearer ' + d.token
      // $http.defaults.headers.common['X-Api-Key'] = d.opciones
      sesion.value = $auth.getUserLogged(v.hash)
    } else {
      hash.value = null
      $http.defaults.headers.common['Authorization'] = ''
    }
  }
}, {
  deep: true,
  inmediate: true
})

provide('Menus', { setMenusApp, hash, sesion })


function onidle() {
  if (myRoute.name !== 'login') {
    console.log("bloquear_pantalla");
    $auth.logout(hash.value)
    hash.value = null
    router.push({ name: 'login', replace: true, query: { t: 1 } })
  }
}

watch(() => $socket.logoutEvent, () => {
  if (hash.value) force_logout_vue.value.show = true
})
</script>
<template lang="pug">
v-app
  Vidle(:duration="duracion_sesion" style="position: absolute; top: -300px" @idle="onidle")
  DialogoForceLogout(ref="force_logout_vue")
  Blocking(ref="blocking_vue")
  Menu(v-if="hash" ref="menu_vue")  
  v-main.bg-main
    router-view(v-slot="{ Component, route }")
      Transition(name="fade" mode="out-in" appear :duration="200")
        keep-alive(:include="rutas_includes")
          component(:is="Component" :key="route.fullPath" v-bind="$attrs")
</template>