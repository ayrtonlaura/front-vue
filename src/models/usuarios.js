import { $http } from '@/plugins'
// import { $http } from '@/plugins/provides'
const api = 'Usuarios'

export default class Usuarios {
  async acceder(params) {
    // console.log(params)
    return await $http
      .post(`${api}/ingresar`, params)
      // .post(`${api}/ingresar`, null, {
      //   params: {
      //     username: params.username,
      //     password: params.password,
      //     recaptcha: params.recaptcha
      //   }
      // })
      .then(r => {
        if (r.data.ok === undefined)
          return { ok: false, mensaje: 'Error: Servidor no responde  — Contáctese con el Área de Soporte Técnico' }
        return r.data
      })
      .catch(err => {
        return { ok: false, mensaje: err.message }
      })
  }
}
