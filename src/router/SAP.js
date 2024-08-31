export default [
  {
    name: 'sap_inicio',
    path: '/:hash/sap',
    component: () => import('@/views/SAP')
  },

  // -> Reportes
  {
    name: 'sap-tablas-productos',
    path: '/:hash/sap/tablas/productos',
    component: () => import('@/views/SAP/Tablas/Productos')
  },

  {
    name: 'sap-orden-venta',
    path: '/:hash/sap/ventas/orden-venta',
    component: () => import('@/views/SAP/Pedidos')
  }
]
