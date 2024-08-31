<script>
export default { name: 'login-comp' }
</script>
<script setup>
import { inject } from 'vue'
import { $auth } from '@/plugins'
import { useRouter } from 'vue-router'
const { hash } = inject('Menus')

const router = useRouter()

async function salir() {
  $auth.logout(hash.value)
  hash.value = null
  router.push({ name: 'login', replace: true })
  // router.push({ path: '/' })
}
</script>
<template lang="pug">
div.fill-height.gap-10.align-center.justify-center.flex-column
  span.text-h2 Cerrar de sesión
  span.text-h5 Está seguro de salir de la aplicación?

  div.gap-20.mt-2
    v-btn(variant="tonal" @click="router.go(-1)") Cancelar
    v-btn(color="error" append-icon="mdi-logout" @click="salir()") Si, salir
</template>