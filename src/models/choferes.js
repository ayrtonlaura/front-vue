import { $http } from '@/plugins'

// const api = 'despachos/choferes'

export default class Choferes {
  constructor() {}

  async listar(params) {
    return await $http.get(`despachos/choferes`, { params }).then(r => r.data)
  }
}
