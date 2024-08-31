<script>
export default { name: 'inicio-comp' }
// import { $http } from '@/plugins'

// async function test() {
//   let r = await $http.get('/sap/odbc')
//   console.log(r);
// }
</script>
<script setup>
import { inject } from 'vue';
import Menu from './components/Menu.vue'

const {
  // sesion,
  hash
} = inject('Menus')
</script>
<template lang="pug">
div.pa-3.fill-height.gap-0.align-center.justify-center

  Menu.mt-n15(ref="menu_vue" modo="inicio" :hash="hash")

  //- div.px-10.w-20(style="max-height: 400px; overflow-y: auto;")
    pre.text-caption {{ sesion }}
  //- v-btn(@click="test") Click me 

</template>
