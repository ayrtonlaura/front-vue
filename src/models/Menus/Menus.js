import { $http } from '@/plugins'

const api = 'Menus/Menus'

export default class Menus {
  constructor() {}

  async menus_por_usuarios(params) {
    return await $http.get(`${api}/menus_por_usuarios`, { params }).then(r => r.data)
  }
}
