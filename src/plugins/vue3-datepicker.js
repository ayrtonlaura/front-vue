import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export function registrar(app) {
  app.component('vue-date-picker', VueDatePicker)
}
