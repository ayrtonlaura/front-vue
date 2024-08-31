import { $http } from '@/plugins'

const api = 'Menus/Modulos'

export default class Modulos {
  constructor() {}

  async listar() {
    return await $http.get(`${api}/listar`, {}).then(r => r.data)
  }
}
