import uppercase from './uppercase'

export function registrar(app) {
  app.directive('uppercase', uppercase)
}
