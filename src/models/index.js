// import CommonModel from './common'

import menus_modulos_model from './Menus/Modulos.js'
import menus_menus_model from './Menus/Menus.js'

import LoginModel from './login'
import UsuariosModel from './usuarios'
import EmpresaModel from './Tablas/Empresa'
import AgenciaModel from './Tablas/Agencia'
import PrecioModel from './Tablas/Precio'
import ClienteModel from './cliente.js'
import choferes_model from './choferes'

import LineasProductosModel from './Tablas/Lineas_productos.js'
import AlmacenesModel from './almacenes'
import StockModel from './stock'
import StockExcelModel from './stock_excel'

import GuiasModel from './Guias'

// -> Tablas
import TipoCambioModel from './Tablas/TipoCambio.js'
import MarcaModel from './Tablas/Marca'
import ProductoModel from './Tablas/Productos'
import UbigeoModel from './Tablas/Ubigeo.js'
import TransporteModel from './Tablas/Transportes.js'

import TablasModel from './Tablas/Tablas.js'

// -> Despachos
// import despachos_orden_model from './Despachos/orden'
import despachos_model from './Despachos/despacho'

// -> Ventas
import carrito_ventas_model from './Ventas/CarritoVentas.js'

// -> Sistemas
import sistemas_soporte_model from './Sistemas/Soporte.js'
import sistemas_modulo_model from './Sistemas/Modulo.js'

export {
  LoginModel,
  EmpresaModel,
  AgenciaModel,
  PrecioModel,
  UsuariosModel,
  ClienteModel,
  GuiasModel,
  choferes_model,
  // CommonModel,
  LineasProductosModel,
  AlmacenesModel,
  StockModel,
  StockExcelModel,
  menus_modulos_model,
  menus_menus_model,

  //-> Despachos
  despachos_model,
  // despachos_orden_model,

  // -> Tablas
  TipoCambioModel,
  MarcaModel,
  ProductoModel,
  UbigeoModel,
  TablasModel,
  TransporteModel,

  // -> Ventas
  carrito_ventas_model,

  // -> Sistemas
  sistemas_soporte_model,
  sistemas_modulo_model
}
