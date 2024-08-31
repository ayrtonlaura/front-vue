import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const toast_options = {
  transition: 'Vue-Toastification__fade',
  maxToasts: 10,
  newestOnTop: true,
  icon: false,
  hideProgressBar: true
}

const t = useToast()

export function registrar(app) {
  app.use(Toast, toast_options)
  // app.provide('$toast', t)
}

export default t
