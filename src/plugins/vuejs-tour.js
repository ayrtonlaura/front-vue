import VueJsTour from '@globalhive/vuejs-tour'
import '@globalhive/vuejs-tour/dist/style.css'

export function registrar(app) {
  app.use(VueJsTour)
}
