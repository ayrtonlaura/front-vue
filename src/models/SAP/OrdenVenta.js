import { $http } from '@/plugins'
// import { $http } from '@/plugins/provides'
const api = 'sap'

export default class SAP_OrdenVenta {
  // constructor() {
  //   this.orden = null
  // }

  async crear(params) {
    return await $http.get(`${api}/pedidos/crear`, { params }).then(r => r.data)
  }

  async modificar(params) {
    return await $http.get(`${api}/pedidos/modificar`, { params }).then(r => r.data)
  }
  async modificar_odbc(params) {
    return await $http.get(`${api}/pedidos/modificar_odbc`, { params }).then(r => r.data)
  }
}
