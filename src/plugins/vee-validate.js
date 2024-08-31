import { Field, Form, defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'

import { required, email, numeric, regex, integer, min } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('numeric', numeric)
defineRule('integer', integer)
defineRule('min', min)
defineRule('regex', regex)

defineRule('precio', value => {
  let pattern = /^[0-9]*.?[0-9]*$/
  return pattern.test(value)
})

configure({
  validateOnModelUpdate: true,
  generateMessage: localize('en', {
    messages: {
      required: 'Campo obligatorio',
      email: 'Debe ser un email válido',
      numeric: 'Debe ser un número',
      integer: 'Debe ser un entero',
      regex: 'No es formato correcto',
      precio: 'Debe ser un precio válido',
      min: 'Debe ser al menos 0:{min} caracteres'
    }
  })
})

export function registrar(app) {
  app.component('Field', Field)
  app.component('Form', Form)
}
