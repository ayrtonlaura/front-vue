import { $http } from '@/plugins'

export default class Modulo {
  async get_empresas_activas() {
    return await $http.get(`empresas/activas`, {}) // .then(r => r.data)
  }

  async get_agencias_por_empresa(params) {
    return await $http.get(`empresas/agencias`, { params }) // .then(r => r.data)
  }

  async get_tipos_precios(params) {
    return await $http.get(`precios/tipos`, { params }) // .then(r => r.data)
  }

  async get_tipos_clientes(params) {
    return await $http.get(`clientes/tipos`, { params }) //.then(r => r.data)
  }

  async get_config(params = { empresa: null, agencia: null, modulo: '' }) {
    return await $http.get(`modulos/configuracion`, { params }).then(r => r.data)
  }

  async guardar_config(params) {
    return await $http.post(`modulos/configuracion`, params) // .then(r => r.data)
  }
}
