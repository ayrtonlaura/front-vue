import { directive as VNumber } from '@coders-tm/vue-number-format'

export function registrar(app) {
  app.directive('number', VNumber)
}
