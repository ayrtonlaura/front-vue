import vuetify from './vuetify'
import router from '@/router'
import $http from './axios.js'
import $auth from '@/auth'
import numeral from '@/plugins/numeral'
import moment from '@/plugins/moment'
import Yup from '@/plugins/yup'

import socket from '@/plugins/vue-socket.io-extended'
import { registrar as registrarRecaptcha } from '@/plugins/vue-recaptcha'
import { registrar as registrarVeeValidate } from '@/plugins/vee-validate'
import { registrar as registrarAgGrid } from '@/plugins/agGrid'
import { registrar as registrarNumerals } from '@/plugins/vue-numerals'
import { registrar as registrarTippy } from '@/plugins/vue-tippy'
import { registrar as registrarTour } from '@/plugins/vuejs-tour'
import toast, { registrar as registrarToastification } from '@/plugins/vue-toastification'
import { registrar as registrarVuepicDatepicker } from '@/plugins/vue3-datepicker'
import { registrar as registrarVueNumberFormat } from '@/plugins/vue-number-format'
import Swal from '@/plugins/sweet-alert'

var $socket = socket
var $numeral = numeral
var $moment = moment
var $yup = Yup
var $toast = toast
var $swal = Swal

export function registerPlugins(app) {
  // registrarSocketIO(app)
  registrarRecaptcha(app)
  registrarVeeValidate(app)
  registrarAgGrid(app)
  registrarNumerals(app)
  registrarTippy(app)
  registrarTour(app)
  registrarToastification(app)
  registrarVuepicDatepicker(app)

  registrarVueNumberFormat(app)

  app.use(vuetify).use(router)
}

export {
  $socket,
  $auth,
  $http,
  $numeral,
  $moment,
  $yup,
  $toast,
  $swal
  // , $tours
}
