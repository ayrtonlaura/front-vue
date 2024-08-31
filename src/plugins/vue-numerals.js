import VueNumerals from 'vue-numerals'
// import numeral from 'numeral'

export function registrar(app) {
  // app.config.globalProperties.$numeral = numeral
  app.use(VueNumerals)
}
