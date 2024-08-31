<script>
export default { name: 'login-view' }
</script>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { LoginModel } from '@/models'
import cmpForm from './form.vue'
import { $toast } from '@/plugins'

import { useRoute } from 'vue-router'
const myRoute = useRoute()

const m_login = new LoginModel()
const { smAndDown } = useDisplay()

const isLoading = ref(false)
const empresas = ref([])
const compoForm = ref()

const ip = ref(null)
const pcname = ref(null)

const show = v => {
  $toast.clear()
  compoForm.value.setEmpresa(v)
}

const saludo = computed(() => {
  var curHr = new Date().getHours()
  if (curHr < 12) return 'Buen día'
  if (curHr < 18) return 'Buenas tardes'
  else return 'Buenas noches'
})

async function loadEmpresas() {
  isLoading.value = true
  empresas.value = await m_login.listar_empresas()
  isLoading.value = false
}

onMounted(() => {
  loadEmpresas()

  $toast.clear()
  if (myRoute.query.t) {
    $toast.error("Al no encontrar actividad, hemos cerrado tu sesión por seguridad", {
      position: 'top-right',
      timeout: 0
    })
  }

  // if (window.__TAURI__) {
  //   const { invoke } = window.__TAURI__.core;
  //   await invoke('iplocal').then((d) => {
  //     let parts = d.split(".")
  //     ip.value = parts[2] + '.' + parts[3]
  //   })
  //   pcname.value = await invoke('pcname')
  // }
})

</script>
<template lang="pug">
div

  cmpForm.compo(ref="compoForm")

  v-slide-y-transition
    div.text-h6.miip(v-show="ip && pcname") 
      code {{ pcname }} &mdash; IP: 
        span.font-weight-bolder {{ ip }}

  div.gap-5.align-center.boton.pa-2.rounded-lg.politicas
    div.px-2
      v-icon(size="24" color="primary") mdi-lock-outline
    div.text-h6.captcha
      span Este sitio es protegido por reCAPTCHA y se aplica a las <a href="https://policies.google.com/privacy" target="_blank">Políticas de Privacidad</a> y a los <a href="https://policies.google.com/terms" target="_blank">Términos de Servicio</a> de Google.


  v-container.clase(fluid style="background-color:#eaf0fe; height: 100vh")
    v-row(dense)
      v-spacer
      v-col(cols="12" md="7" style="padding-bottom: 90px !important;")

        v-container
          v-row(dense)
            v-spacer
            v-col.pt-4.text-center.gap-6.flex-column(cols="12" md="5")
              span.text-h3 {{ saludo }}
              span.text-h5 Seleccione una empresa para ingresar a su cuenta:

            v-spacer

          v-row.mt-7(dense)
            div.align-center.w-100.gap-7.flex-column(v-if="isLoading")
              v-progress-circular(color="primary" indeterminate :size="20" :width="2")
              span.text-h6.text-primary Listando empresas..
            v-col.justify-center.flex-wrap.d-flex(:class="smAndDown ? 'gap-20' : 'gap-80'")
              div.empresa(v-for="item of empresas" :key="item.id" :class="item.abreviatura.toLowerCase()" @click="show(item)")

      v-spacer

</template>
<style lang="scss">
.empresa,
.jch,
.car {
  height: 200px;
  width: 200px;
  min-height: 200px;
  min-width: 200px;
  border-radius: 8%;
  background-position: center center;
  background-size: contain;
  // margin: auto;
  transition: all ease 0.2s;
  cursor: pointer;

  box-shadow: 0 0 20px 0 rgb(0 0 0 / .1);

  &:hover {
    // box-shadow: 0 0 35px 0 rgb(0 0 0 / .3);
    box-shadow: 0 0 0 4px rgb(11, 35, 252);
  }
}

.jch {
  background-color: #232b54;
  background-image: url('@/assets/images/empresa_JCH.png');
}

.car {
  background-color: #fff;
  background-image: url('@/assets/images/empresa_CAR.png');
}

.miip {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  color: #363636;

  code {
    font-variation-settings: 'wght' 600 !important;
    font-size: 11px !important;
    padding: 3px 10px;
    line-height: 20px;
    border-radius: 0 0 7px 7px;
    margin: auto;
    background-color: rgb(255, 236, 70);
  }
}

.politicas {
  position: fixed;
  bottom: 20px;
  margin: auto;
  width: 320px;
  left: 0;
  right: 0;

  .captcha {
    line-height: 18px !important;

    a {
      color: #3246d3;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// https://www.gradientmagic.com/collection/lightbg
.clase {
  background-image: linear-gradient(134deg, rgba(1, 1, 1, 0.02) 0%, rgba(1, 1, 1, 0.02) 16%, transparent 16%, transparent 76%, rgba(58, 58, 58, 0.02) 76%, rgba(58, 58, 58, 0.02) 100%), linear-gradient(215deg, rgba(166, 166, 166, 0.02) 0%, rgba(166, 166, 166, 0.02) 33%, transparent 33%, transparent 79%, rgba(111, 111, 111, 0.02) 79%, rgba(111, 111, 111, 0.02) 100%), linear-gradient(303deg, rgba(215, 215, 215, 0.02) 0%, rgba(215, 215, 215, 0.02) 7%, transparent 7%, transparent 90%, rgba(192, 192, 192, 0.02) 90%, rgba(192, 192, 192, 0.02) 100%), linear-gradient(302deg, rgba(113, 113, 113, 0.02) 0%, rgba(113, 113, 113, 0.02) 34%, transparent 34%, transparent 73%, rgba(65, 65, 65, 0.02) 73%, rgba(65, 65, 65, 0.02) 100%), linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255));
}
</style>