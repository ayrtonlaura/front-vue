import { $http } from '@/plugins'
// import { $http } from '@/plugins/provides'
// const api = 'Login/Acceso'
// const api = ''

export default class Login {
  async listar_empresas() {
    return await $http.get('empresas/login').then(r => r.data)
  }

  // async x_listar_empresas() {
  //   // console.log(`${api}/acceder`)
  //   return await $http.get(`${api}/listar_empresas`).then(r => r.data)
  // }

  async acceder(params) {
    // console.log(params)

    return await $http
      .post(`/login`, params)
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
