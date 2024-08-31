window.addEventListener('auxclick', event => event.preventDefault())
window.addEventListener('contextmenu', event => event.preventDefault())

// Plugins
import { registerPlugins } from '@/plugins'

import { registrar as registrarComponents } from '@/components'
import { registrar as registrarDirectives } from '@/directives'

// Components
import App from '@/views/_Main/App.vue'

// import { createVuetify } from 'vuetify'
import VueApexCharts from 'vue3-apexcharts'
// Composables
import { createApp } from 'vue'


const app = createApp(App)
//CHARTS
// app.use(vuetify)
app.use(VueApexCharts)
app.component( VueApexCharts)

registerPlugins(app)
registrarComponents(app)
registrarDirectives(app)

app.mount('#app')
