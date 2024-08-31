import { createRouter, createWebHashHistory } from 'vue-router'
import auth from '@/auth'

import routes_atencion_clientes from './AtencionClientes'
import routes_comex from './Comex'
import routes_sistemas from './Sistemas'
import routes_sap from './SAP'

const routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('@/views/_Main/Login'),
    beforeEnter: (to, from, next) => {
      let autorizado = auth.getUserLogged(from.params.hash)
      // console.log(autorizado)
      if (autorizado) {
        console.warn('Sesión activa y válida.. Stop para entrar al Login')
        return next(false)
      }
      next()
    }
  },
  {
    name: 'logout',
    path: '/:hash/logout',
    component: () => import('@/views/_Main/Logout.vue')
  },
  {
    name: 'inicio',
    path: '/:hash',
    component: () => import('@/views/_Main/Inicio.vue')
  },

  ...routes_atencion_clientes,
  ...routes_comex,
  ...routes_sistemas,
  ...routes_sap
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (!to.params.hash) {
    if (to.name == 'login') {
      return next()
    } else {
      return next({ name: 'login' })
    }
  }

  let autorizado = auth.getUserLogged(to.params.hash)

  if (autorizado) {
    return next()
  } else {
    if (to.name !== 'login') {
      return next({ name: 'login' })
    }
  }
  next()
})

// router.onError(err => {
//   console.error(err)
// })

export default router
