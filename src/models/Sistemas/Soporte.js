import { $http } from '@/plugins'

const api = 'Sistemas/Soporte'

export default class Soporte {
  constructor() {}

  // -> Pasar_a_diferida
  async pasar_a_diferida(params) {
    return await $http.get(`${api}/Pasar_a_diferida`, { params }).then(r => r.data)
  }

  async convertir_a_diferida(params) {
    return await $http.get(`${api}/Pasar_a_diferida/convertir`, { params }).then(r => r.data)
  }

  // -> Cambiar vendedor
  async buscar_documento(params) {
    return await $http.get(`${api}/Cambiar_vendedor/buscar_documento`, { params }).then(r => r.data)
  }

  async listar_vendedores(params) {
    return await $http.get(`${api}/Cambiar_vendedor/lista_vendedores`, { params }).then(r => r.data)
  }

  async guardar_vendedores(params) {
    return await $http.post(`${api}/Cambiar_vendedor/guardar`, params).then(r => r.data)
  }
}
