import { $http } from '@/plugins'

// const api = 'Tablas/Empresas'

// const api_v1 = import.meta.env.VITE_API_V1

export default class Agencia {
  async listar(params) {
    return await $http.get(`/agencias`, { params }).then(r => r.data)
  }
}