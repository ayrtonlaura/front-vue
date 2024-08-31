<script setup>
import { nextTick, ref, inject } from 'vue'
import { $auth, $yup, $toast } from '@/plugins'
import { useRouter } from 'vue-router'
import { LoginModel } from '@/models'


import img_JCH from '@/assets/images/empresa_JCH.png'
import bg_JCH from '@/assets/images/bg_JCH.jpg'

import img_CAR from '@/assets/images/empresa_CAR.png'
import bg_CAR from '@/assets/images/bg_CAR.jpg'

import { useReCaptcha } from 'vue-recaptcha-v3'
import { onMounted } from 'vue'
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

const router = useRouter()
const m_login = new LoginModel()
const { bloquear, desbloquear } = inject("bloquear")

const schema = $yup.object().shape({
  Usuario: $yup.string().required().min(4),
  Contraseña: $yup.string().required()
})

const empresa = ref({})
const form = ref(null)
const txtUser = ref(null)
const txtPass = ref(null)

const login = ref({
  username: '',
  password: '',
  recaptcha: '',
  empresa: {}
})

const fondo = ref()
const logo = ref()
const show = ref(false)

const onEnterUser = () => { if (login.value.username) txtPass.value.focus() }
const onEnterPass = () => { if (login.value.password) validar() }

function setEmpresa(v) {

  empresa.value = v

  if (v.abreviatura == 'JCH') {
    logo.value = img_JCH
    fondo.value = new URL(bg_JCH, import.meta.url)
  } else {
    logo.value = img_CAR
    fondo.value = new URL(bg_CAR, import.meta.url)
  }

  login.value.empresa = v

  show.value = true
  nextTick(() => {
    txtUser.value.focus()
  })
}

async function validar() {
  txtUser.value.blur()
  txtPass.value.blur()
  const result = await form.value.validate()

  $toast.clear() // hide

  if (result.valid) {

    bloquear('Validando credenciales... ')

    // -> Genera el token desde Google (reCaptcha v3)
    await recaptchaLoaded()
    login.value.recaptcha = await executeRecaptcha('login')

    let params = {
      usuario: login.value.username,
      password: login.value.password,
      recaptcha: login.value.recaptcha,
      empresa: login.value.empresa.id

      // empresa_nombre: login.value.empresa.nombre,
      // empresa_base_hostname: login.value.empresa.hostname,
      // empresa_base_comercial: login.value.empresa.base_comercial,
      // empresa_base_contable: login.value.empresa.base_contable,
      // empresa_abreviatura: login.value.empresa.abreviatura,
      // empresa_periodo: login.value.empresa.periodo,
    }

    let result = await m_login.acceder(params)
    if (result.ok) {

      let uniqueID = generateUniqueID();
      $auth.setUserLogged(uniqueID, result)
      router.push({ name: 'inicio', params: { hash: uniqueID } }) //.catch(() => { })

      desbloquear()
    } else {
      $toast.error(result.mensaje, { position: 'bottom-center', timeout: 3000 })
      desbloquear()
    }
  }


}

function generateUniqueID() {
  let uniqueID = Math.floor(Math.random() * Date.now()).toString(16);
  return uniqueID;
}

async function cerrar() {
  show.value = false
  setTimeout(async () => {
    await form.value.resetForm({ values: { username: '', password: '' } })
  }, 500);
}

onMounted(() => {
  // cerrar()
})

defineExpose({ setEmpresa })
</script>
<template lang="pug">
v-dialog.custom(eager v-model="show" width="340px" scrim="white" persistent no-click-animation)
  v-container.pa-0.formulario(:style="{ backgroundImage: 'url(' + fondo + ')' }")
    v-row(dense no-gutters)
      v-col.pt-13.pb-15.text-center
        v-btn(style="position: absolute; top: 4px; right: 4px" icon="mdi-window-close" variant="tonal" color="white"
        @click="cerrar()")
        img.rounded(:src="logo" height="60" @click="")
    v-row(dense no-gutters)
      v-col
        div.bg-white.pa-2.rounded-xl
          Form(ref='form' :validation-schema="schema" v-slot="{ errors, meta }")
            v-container
              v-row(dense)
                v-col
                  Field(name='Usuario' v-model='login.username' v-slot='{ field, meta }')
                    v-text-field(label="Usuario" variant="outlined" density="compact" placeholder='Codigo de usuario'
                    :error-messages='errors.Usuario'
                    v-bind='field'
                    ref="txtUser"
                    autocomplete="off"
                    v-on:keyup.enter='() => meta.valid && onEnterUser()'
                    )
                v-col
                  Field(name='Contraseña' v-model='login.password' v-slot='{ field, meta }')
                    v-text-field(label="Contraseña" variant="outlined" density="compact" placeholder='•••••••••'  type='password'
                    :error-messages='errors.Contraseña'
                    v-bind='field'
                    ref='txtPass'
                    autocomplete="off"
                    v-on:keyup.enter='onEnterPass'
                    )

              v-row(dense)
                v-col.gap-0.mt-2.pb-0.align-center.justify-space-around
                  v-btn.xmx-auto.px-10(@click='validar()' color='primary' rounded size='large')
                    span(style='font-size: 14px') Ingresar
                    v-icon(end icon='mdi-arrow-right' size='16px')

              //- v-row
                v-col
                  pre.text-caption {{ empresa }}

</template>
<style>
.formulario {
  border-radius: 15px;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / .4);
  background-size: 100%;
}

.v-overlay.v-overlay--active.custom {
  backdrop-filter: blur(10px);
}

.v-overlay.custom .v-overlay__scrim {
  opacity: 0.8;
}
</style>