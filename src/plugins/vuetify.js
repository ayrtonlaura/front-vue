import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '../assets/main.scss'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        colors: {
          background: '#212121', // Fondo general
          surface: '#333333', // Superficies
          primary: '#1e88e5', // Azul claro
          secondary: '#ff4081', // Rosa
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          onPrimary: '#FFFFFF', // Color del texto sobre el primary
          onSecondary: '#FFFFFF', // Color del texto sobre el secondary
          tonalOverlay: '#42424299 !important',
          tonalHover: '#424242 !important',
          onTonalHover: '#ffffff !important', // Color del texto en hover en tonal (ajustado para modo oscuro)
        },
      },
      light: {
        dark: false,
        colors: {
          appbar: '#f2f6fe',
          main: '#f7faff',

          primary: '#3246D3',
          secondary: '#00D0FF',
          secondary_2: '#C7F4FF',
          accent: '#C7F4FF',

          boton_3: '#D8DCF7',

          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',

          boton: '#eff5fe',

          titulo: '#061058',
          subtitulo: '#AFB3CA'
        }
      }
    }
  },
  defaults: {
    VList: {
      density: 'comfortable'
    },
    VSelect: {
      variant: 'underlined',
      persistentPlaceholder: true,
      density: 'comfortable',
      itemTitle: 'descripcion',
      itemValue: 'id',
      hideDetails: 'auto',
      returnObject: true
    },
    VAutocomplete: {
      variant: 'underlined',
      persistentPlaceholder: true,
      density: 'comfortable',
      itemTitle: 'descripcion',
      itemValue: 'id',
      hideDetails: 'auto',
      returnObject: true,
      noDataText: 'Sin datos disponibles'
    },
    VTextField: {
      variant: 'underlined',
      persistentPlaceholder: true,
      density: 'comfortable',
      hideDetails: 'auto'
    },
    VTextarea: {
      variant: 'underlined',
      persistentPlaceholder: true,
      density: 'comfortable',
      hideDetails: 'auto'
    },
    VBtn: {
      variant: 'flat',
      size: 'small',
      color: 'primary',
      style: [{ textTransform: 'none', letterSpacing: 0 }]
    },
    VSwitch: {
      flat: true,
      density: 'compact',
      hideDetails: 'auto'
    },
    VCheckbox: {
      flat: true,
      density: 'compact',
      hideDetails: 'auto',
      color: 'primary'
    },
    VRadio: {
      flat: true,
      density: 'compact',
      hideDetails: 'auto',
      color: 'primary'
    }
  }
})
