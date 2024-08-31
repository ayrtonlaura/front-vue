import { $http } from '@/plugins'

const api = 'despachos'

var abortController = new AbortController()

export default class despacho {
  async entorno(params) {
    return await $http.get(`${api}/entorno`, { params }).then(r => r.data)
  }

  async ordenes(params) {
    abortController.abort()
    abortController = new AbortController()
    let signal = abortController.signal

    return await $http
      .get(`${api}/ordenes`, {
        params,
        signal
      })
      .then(r => r.data)
      .catch(err => {
        console.error(`Error: ${err.message}`)
      })
  }

  async listar(params) {
    return await $http.get(`${api}/listar`, { params }).then(r => r.data)
  }

  async orden_detalles(params) {
    return await $http.get(`${api}/orden_detalles`, { params }).then(r => r.data)
  }

  async guardar(params) {
    return await $http.post(`${api}/orden`, params).then(r => r.data)
  }

  async actualizar(params) {
    return await $http.patch(`${api}/orden`, params).then(r => r.data)
  }

  // async ordenes(params) {
  //   abortController.abort()
  //   abortController = new AbortController()
  //   let signal = abortController.signal

  //   return await $http
  //     .get(`${api}/ordenes`, {
  //       params,
  //       signal
  //     })
  //     .then(r => r.data)
  //     .catch(err => {
  //       console.error(`Error: ${err.message}`)
  //     })
  // }

  // async listar(params) {
  //   return await $http.get(`${api}/listar`, { params }).then(r => r.data)
  // }

  // async orden(params) {
  //   return await $http.get(`${api}`, { params }).then(r => r.data)
  // }

  // async guardar(params) {
  //   return await $http.post(`${api}/guardar`, params).then(r => r.data)
  // }
}
