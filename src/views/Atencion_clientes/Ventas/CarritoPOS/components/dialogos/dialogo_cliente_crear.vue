<script>
export default { name: 'dialogo-cliente-crear' }
</script>
<script setup>
import { ref, reactive, inject, onMounted, computed, watch } from "vue"
import {
  ClienteModel,
  // UbigeoModel, TablasModel
} from '@/models'
import { $swal, $toast, $yup } from "@/plugins";

const { sesion } = inject('Menus')
const { tablas } = inject('prov_carrito')

const m_cliente = new ClienteModel()
// const m_ubigeo = new UbigeoModel()
// const m_tablas = new TablasModel()

// const distritos = ref(tablas.distritos)
const distritos = computed(() => {
  // console.log(tablas.value);
  return tablas.value.distritos
})
const paises = computed(() => {
  // console.log(tablas.value);
  return tablas.value.paises
})
// const paises = ref()

const show = ref(false)
const formCliente = ref()
const verificado = ref(false)
const verificado_loading = ref(false)

const tipos_cliente = reactive([
  { id: 1, descripcion: 'DNI - Documento Nacional de Identidad' },
  { id: 6, descripcion: 'RUC - Registro Único de Contribuyentes' },
  { id: 4, descripcion: 'CE - Carnet de Extranjería' },
])

const schema = $yup.object().shape({
  tipo: $yup.string().required(),

  codigo: $yup.string().required()
    .when('tipo', { is: (v) => v == 1, then: (s) => s.length(8) })
    .when('tipo', { is: (v) => v == 6, then: (s) => s.length(11) })
    .when('tipo', { is: (v) => v == 4, then: (s) => s.max(15) }),

  razon_social: $yup.string()
    .when('tipo', { is: (v) => v == 6, then: (s) => s.required().max(80) }),

  direccion: $yup.string().required().max(80),

  nombre_1: $yup.string()
    .when('tipo', { is: (v) => v == 1, then: (s) => s.required().max(20) })
    .when('tipo', { is: (v) => v == 4, then: (s) => s.required().max(20) })
    .when('tipo', { is: (v) => v == 6, then: (s) => s.nullable().optional().max(20) }),

  nombre_2: $yup.string().nullable().optional().max(20),

  // ape_paterno: $yup.string().required().max(20),
  ape_paterno: $yup.string()
    .when('tipo', { is: (v) => v == 1, then: (s) => s.required().max(20) })
    .when('tipo', { is: (v) => v == 4, then: (s) => s.required().max(20) })
    .when('tipo', { is: (v) => v == 6, then: (s) => s.nullable().optional().max(20) }),

  ape_materno: $yup.string().nullable().optional().max(20),

  ubigeo: $yup.string()
    .when('tipo', { is: (v) => v == 1, then: (s) => s.required() })
    .when('tipo', { is: (v) => v == 6, then: (s) => s.required() }),

  pais: $yup.string().required().max(30),

  correo: $yup.string()
    .nullable()
    .optional()
    .correo('Correo electrónico inválido')
    .max(100, "Maximo de 100 caracteres"),

  telefono: $yup.string().nullable().optional().max(25),
})

const cliente = reactive({
  empresa: sesion.value.conexion.id,
  tipo: "",
  codigo: "",
  ruc_dni: "",
  razon_social: "",
  nombre_1: "",
  nombre_2: "",
  ape_paterno: "",
  ape_materno: "",
  direccion: "",
  correo: "",
  telefono: "",
  ubigeo: "",

  distrito: "",
  provincia: "",
  departamento: "",

  pais: "",
  condicion: "",
  estado: "",
  tipo_precio: "5",
  tipo_cliente: "03",
  forma_venta: "001",
  vendedor: sesion.value.usuario.vendedor,
  usuario: sesion.value.usuario.usuario,
})

const cliente_default = reactive({
  empresa: sesion.value.conexion.id,
  // tipo: "",
  // codigo: "",
  ruc_dni: "",
  razon_social: "",
  nombre_1: "",
  nombre_2: "",
  ape_paterno: "",
  ape_materno: "",
  direccion: "",
  correo: "",
  telefono: "",
  ubigeo: "",
  pais: "",
  condicion: "",
  estado: "",
  tipo_precio: "5",
  tipo_cliente: "03",
  forma_venta: "001",
  vendedor: sesion.value.usuario.vendedor,
  usuario: sesion.value.usuario.codigo,
})


watch(() => cliente.tipo, (m) => {
  verificado.value = false
  formCliente.value.resetForm({
    values: {
      tipo: m,
      password: ''
    }
  })
})

async function guardar() {
  const result = await formCliente.value.validate()
  console.log(result);

  if (result.valid) {
    let adicionales = []
    let correo = cliente.correo
    let telefono = cliente.telefono

    if (!correo) adicionales.push("no se ha ingresado un <span class='font-weight-bold'>correo electrónico</span>")
    if (!telefono) adicionales.push("no se ha ingresado un <span class='font-weight-bold'>teléfono</span>")

    if (adicionales.length > 0) {

      $swal.fire({
        title: "¿Y estos datos?",
        html: `<span class='text-h5'>Confirme guardar a pesar que ${adicionales.join(" y ")}</span>`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
        // showLoaderOnConfirm: true,
        // preConfirm: async () => {
        //   let r = await crear_cliente()
        //   console.log(r);
        //   $swal.fire("Saved!", "", "success");

        // },
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) crear_cliente()
      })

    } else {
      crear_cliente()
    }



  }
}

async function crear_cliente() {
  // $swal.showLoading();
  $swal.fire({
    title: "Espere un momento",
    html: "Se está guardando al cliente...",
    // timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: async () => {
      $swal.showLoading();
      await m_cliente.crear(cliente).finally(() => {
        $swal.close();
      })
      $swal.fire("Guardado!", "", "success").then(() => {
        cerrar()
      })
    }
  })
}

onMounted(async () => {
  // console.log(sesion.value);

  // nextTick(() => {

  // console.log(tablas.value);
  // distritos.value = tablas.value.distritos // await m_ubigeo.distritos({ empresa: sesion.value.conexion.id })
  // paise}s.value = tablas.value.paises // await m_ubigeo.distritos({ empresa: sesion.value.conexion.id })
  // paises.value = await m_tablas.paises({ empresa: sesion.value.conexion.id })

  // console.log(distritos.value);
  // })
})

const hint_distrito = computed(() => {
  if (!cliente.ubigeo) return ''
  let oobi = distritos.value.find(m => m.codigo == cliente.ubigeo)
  if (oobi) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    cliente.distrito = oobi.distrito
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    cliente.provincia = oobi.provincia
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    cliente.departamento = oobi.departamento
    return `${oobi.provincia}, ${oobi.departamento}`
  }
  return ''
})

// watch(his)

const lista_bloqueados = reactive([])

async function verificarCodigo() {
  let checkYupCodigo = await formCliente.value.validateField('codigo')
  if (checkYupCodigo.valid) {

    verificado_loading.value = true
    verificado.value = false

    console.log('validar 1: cliente que no exista en nuestra base');
    let result = await m_cliente.existe({ empresa: sesion.value.conexion.id, codigo: cliente.codigo })

    verificado_loading.value = false

    // console.log(result);
    Object.assign(cliente, cliente_default)
    lista_bloqueados.splice(0)

    if (result.existe) {
      $swal.fire({
        icon: "info",
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: "¡Cliente ya existe!",
        html: `<span class="text-h5">${result.mensaje}</span>`,
        confirmButtonText: `Aceptar`,
      })
    } else {

      console.log('cliente no existe.. consulta con la API de Factiliza');

      // TODO: Para probar cuando un DNI no esta registrado = 87987999

      verificado_loading.value = true
      let result_api = await m_cliente.consulta_api({ tipo: cliente.tipo, codigo: cliente.codigo })

      if (result_api.ok) {

        cliente.ruc_dni = cliente.codigo
        cliente.razon_social = result_api.data.razon
        cliente.nombre_1 = result_api.data.nombre_1
        cliente.nombre_2 = result_api.data.nombre_2
        cliente.ape_paterno = result_api.data.apellido_paterno
        cliente.ape_materno = result_api.data.apellido_materno
        cliente.direccion = result_api.data.direccion
        cliente.ubigeo = result_api.data.ubigeo

        cliente.condicion = result_api.data.condicion
        cliente.estado = result_api.data.estado

        cliente.correo = result_api.data.correo
        cliente.telefono = result_api.data.telefono

        // -> Bloquear campos
        lista_bloqueados.push('nombre_1')
        lista_bloqueados.push('nombre_2')
        lista_bloqueados.push('ape_paterno')
        lista_bloqueados.push('ape_materno')

        if (cliente.direccion.trim() !== "") lista_bloqueados.push('direccion')


        if ([1, 6].includes(cliente.tipo)) {
          cliente.pais = "PERU"
          if (cliente.ubigeo.trim() !== "") lista_bloqueados.push('ubigeo')
          lista_bloqueados.push('pais')
        } else {
          lista_bloqueados.push('ubigeo')
          // lista_bloqueados.push('pais')
        }


        verificado.value = true
        verificado_loading.value = false

      } else {
        console.log('Algun error');
        verificado.value = true
        verificado_loading.value = false

        $toast.error(result_api.mensaje.message + '\nIngrese los datos manualmente', { position: 'bottom-center', timeout: 5000 })

        formCliente.value.resetForm({
          values: {
            tipo: cliente.tipo,
            codigo: cliente.codigo,
          }
        })
      }

    }

  }

}

function cerrar() {
  console.log('cerrar()');
  cliente.tipo = null
  show.value = false
}

function bloquear(campo) {
  return lista_bloqueados.includes(campo)
}

defineExpose({ show })
</script>
<template lang="pug">
//- v-dialog(v-model="show" width="500" scrollable)
v-dialog(v-model="show" width="550" eager scrollable persistent no-click-animation)
  v-card(height="500")
    v-toolbar(dense height="40")
      div.px-2
      span.text-h5 Creación de cliente
      v-spacer
      v-btn(icon="mdi-window-close" @click="cerrar()")
    v-card-text.pa-3.gap-10
      //- div.w300
        pre.text-caption {{ distritos }}
      //- pre.text-caption {{ cliente }}
      //- pre.text-caption {{ lista_bloqueados }}

      Form.w-100(ref="formCliente" v-slot="{ errors }" :validation-schema="schema")
        v-container.pa-1(fluid)
          v-row(dense)
            v-col.gap-10
              div.flex-fill
                Field(v-slot="{ field }" v-model="cliente.tipo" name="tipo")
                  v-select(
                    v-model="cliente.tipo" label="Tipo de documento" :items="tipos_cliente" :return-object="false"
                    v-bind="field" :error-messages="errors.tipo"
                  )
              div.w140
                Field(v-slot="{ field }" v-model="cliente.codigo" name="codigo")
                  v-text-field(
                    v-model="cliente.codigo" label="Número de documento"
                    v-bind="field" :error-messages="errors.codigo"
                    :disabled="!cliente.tipo"
                  )
              v-btn.mt-2(
                :disabled="!cliente.tipo" prepend-icon="mdi-check-decagram" :loading="verificado_loading" 
                @click="verificarCodigo()"
                ) Verificar

          v-row(v-if="!verificado" dense)
            v-col(cols="12")
              v-skeleton-loader(boilerplate type="text, paragraph, list-item-two-line, divider, actions")

          template(v-else)
            v-row(v-if="cliente.tipo == 6" dense)
              v-col(cols="12")
                Field(v-slot="{ field }" v-model="cliente.razon_social" name="razon_social")
                  v-text-field(
                    v-model="cliente.razon_social" label="Razón social"
                    v-bind="field" :error-messages="errors.razon_social"
                  )
            v-row(v-if="cliente.tipo == 1 || cliente.tipo == 4" dense)
              v-col(cols="6")
                Field(v-slot="{ field }" v-model="cliente.nombre_1" name="nombre_1")
                  v-text-field(v-model="cliente.nombre_1" label="Nombre 1" v-bind="field" :error-messages="errors.nombre_1" :readonly="bloquear('nombre_1')")
                    template(#label="{ label }")
                      i.mdi.mdi-lock.pr-1(v-if="bloquear('nombre_1')")
                      span.text-h6 {{ label }}

              v-col(cols="6")
                Field(v-slot="{ field }" v-model="cliente.nombre_2" name="nombre_2")
                  v-text-field(v-model="cliente.nombre_2" label="Nombre 2" v-bind="field" :error-messages="errors.nombre_2" :readonly="bloquear('nombre_2')")
                    template(#label="{ label }")
                      i.mdi.mdi-lock.pr-1(v-if="bloquear('nombre_2')")
                      span.text-h6 {{ label }}

              v-col(cols="6")
                Field(v-slot="{ field }" v-model="cliente.ape_paterno" name="ape_paterno")
                  v-text-field(v-model="cliente.ape_paterno" label="Apellido paterno" v-bind="field" :error-messages="errors.ape_paterno" :readonly="bloquear('ape_paterno')")
                    template(#label="{ label }")
                      i.mdi.mdi-lock.pr-1(v-if="bloquear('ape_paterno')")
                      span.text-h6 {{ label }}

              v-col(cols="6")
                Field(v-slot="{ field }" v-model="cliente.ape_materno" name="ape_materno")
                  v-text-field(v-model="cliente.ape_materno" label="Apellido materno" v-bind="field" :error-messages="errors.ape_materno" :readonly="bloquear('ape_paterno')")
                    template(#label="{ label }")
                      i.mdi.mdi-lock.pr-1(v-if="bloquear('ape_paterno')")
                      span.text-h6 {{ label }}

            v-row(dense)
              v-col
                Field(v-slot="{ field }" v-model="cliente.direccion" name="direccion")
                  v-text-field(
                    v-model="cliente.direccion" v-uppercase label="Dirección"
                    v-bind="field" :error-messages="errors.direccion"
                    :readonly="bloquear('direccion')"
                  )
                    template(#label="{ label }")
                      i.mdi.mdi-lock.pr-1(v-if="bloquear('direccion')")
                      span.text-h6 {{ label }}

            v-row(dense)
              v-col
                Field(v-slot="{ }" v-model="cliente.ubigeo" name="ubigeo")
                  v-autocomplete(
                    v-model="cliente.ubigeo" 
                    label="Ubigeo (distrito)" 
                    :items="distritos" 
                    item-title="distrito" item-value="codigo"
                    persistent-hint
                    :return-object="false" 
                    :hint="hint_distrito"
                    :error-messages="errors.ubigeo"
                    :readonly="bloquear('ubigeo')"
                    )
                    //- v-bind="field" 
                    template(#label="{ label }")
                      i.mdi.mdi-lock.pr-1(v-if="bloquear('ubigeo')")
                      span.text-h6 {{ label }}
                    template(#item="{ props, item }")
                      v-list-item.pb-2(v-bind="props")
                        div.gap-4
                          span.text-caption {{ item.raw.provincia }},
                          span.text-caption {{ item.raw.departamento }}
              v-col
                Field(v-slot="{ }" v-model="cliente.pais" name="pais")
                  v-autocomplete(
                    v-model="cliente.pais"
                    :items="paises"
                    label="País" 
                    :return-object="false" 
                    item-value="nombre" 
                    item-title="nombre"
                    :error-messages="errors.pais"
                    :readonly="bloquear('pais')"
                  )
                    //- v-bind="field" 
                    template(#label="{ label }")
                      i.mdi.mdi-lock.pr-1(v-if="bloquear('pais')")
                      span.text-h6 {{ label }}                  
            v-row(dense)
              v-col
                Field(v-slot="{ field }" v-model="cliente.correo" name="correo")
                  v-text-field(
                    v-model="cliente.correo" label="Correo electrónico"
                    v-bind="field" :error-messages="errors.correo"
                  )
              v-col
                Field(v-slot="{ field }" v-model="cliente.telefono" name="telefono")
                  v-text-field(
                    v-model="cliente.telefono" label="Teléfono / Celular"
                    v-bind="field" :error-messages="errors.telefono"
                  )

            v-row(dense)
              v-col.pt-3.text-center.gap-5.justify-space-around
                v-chip.text-caption(density="compact") Precio: 
                  span.pl-1.font-weight-bold Público
                v-chip.text-caption(density="compact") Tipo: 
                  span.pl-1.font-weight-bold Público final
                v-chip.text-caption(density="compact") Condición pago: 
                  span.pl-1.font-weight-bold Contado
                v-chip.text-caption(density="compact") Vendedor: 
                  span.pl-1.font-weight-bold {{ sesion.usuario.vendedor }}

    v-card-actions.gap-10.justify-space-around(v-if="verificado")
      //- v-btn(disabled @click="crear()") Crear nuevo cliente
      v-btn.px-5(rounded prepend-icon="mdi-window-close" @click="cerrar()") Cancelar
      v-btn.px-5(variant="flat" color="success" rounded prepend-icon="mdi-content-save" @click="guardar()") Guardar
</template>