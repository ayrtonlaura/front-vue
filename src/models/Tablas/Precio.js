import { $http } from '@/plugins'

// const api = 'Tablas/Empresas'

// const api_v1 = import.meta.env.VITE_API_V1

export default class Precio {
  async listar(params) {
    return await $http.get(`/precios`, { params }).then(r => r.data)
  }

  // async periodos_por_grupo(params) {
  //   return await $http.get(`${api_v1}/SOFTCOM/Empresas/periodos`, { params }).then(r => r.data)
  // }

  // async detalles(params) {
  //   return await $http.get(`${api_v1}/SOFTCOM/Empresas/detalles`, { params }).then(r => r.data)
  // }

  // async guardar(params) {
  //   return await $http.post(`${api_v1}/SOFTCOM/Empresas/guardar`, params).then(r => r.data)
  // }
}
