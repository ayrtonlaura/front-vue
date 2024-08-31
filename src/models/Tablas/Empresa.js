import { $http } from '@/plugins'

export default class Empresa {
  async listar() {
    return await $http.get(`Empresas/login`, {}).then(r => r.data)
  }

  async periodos_por_abreviatura(params) {
    return await $http.get(`Empresas/periodos`, { params }).then(r => r.data)
  }

  async detalles(params) {
    return await $http.get(`Empresas/detalles`, { params }).then(r => r.data)
  }

  // async xlistar() {
  //   return await $http.get(`${api}/listar`).then(r => r.data)
  // }

  // async x_detalles(params) {
  //   return await $http.get(`${api}/detalles_empresa`, { params }).then(r => r.data)
  // }

  // async guardar(params) {
  //   return await $http.post(`${api_v1}/SOFTCOM/Empresas/guardar`, params).then(r => r.data)
  // }
}
