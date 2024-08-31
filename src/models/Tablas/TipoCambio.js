import { $http } from '@/plugins'

export default class TipoCambio {
  async listar(params) {
    return await $http.get(`tipo_cambio`, { params }).then(r => r.data)
  }
}
