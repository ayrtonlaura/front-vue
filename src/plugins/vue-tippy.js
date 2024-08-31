import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling

export function registrar(app) {
  app.use(VueTippy, {
    directive: 'tippy'
    // component: 'tippy' // => <tippy/>
  })
}
