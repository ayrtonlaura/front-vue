import * as Yup from 'yup'

import { es } from 'yup-locales'
import { setLocale } from 'yup'
setLocale(es)

Yup.setLocale({
  mixed: {
    required: 'Campo requerido'
  },
  string: {
    min: 'Por lo menos ${min} letras'
  }
})

Yup.addMethod(Yup.string, 'correo', function (message) {
  return this.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
    name: 'correo',
    message,
    excludeEmptyString: true
  })
})

export default Yup
