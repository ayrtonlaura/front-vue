import axios from 'axios'

let baseURL = ''
let host = window.location.host

// let local = '192.168.1.9:51020'
let local = '192.168.1.9:8585'
let api_local = '192.168.1.243'

let wan = '190.119.254.92'
const puerto = 5000
// console.log(1)
// console.log('axios - host: ', host)

let nest_host = import.meta.env.VITE_API
// let nest_port = import.meta.env.VITE_PORT

let PC_AYRTON = '192.168.1.229'

const debuggers = [PC_AYRTON, api_local, api_local + `:${puerto}`, 'tauri.localhost', `localhost:${puerto}`]

if (debuggers.includes(host)) {
  // baseURL = 'http://' + api_local + '/' + import.meta.env.VITE_NEST
  // listo con nest
  baseURL = `${nest_host}`
  // baseURL = `http://192.168.1.243:${nest_port}/api/`
} else {
  if (host == local) {
    baseURL = `api/`
    // baseURL = 'http://' + api_local + '/' + import.meta.env.VITE_NEST
  } else {
    baseURL = 'http://' + wan + '/' + import.meta.env.VITE_NEST
  }
}

// console.log('axios - baseURL: ', baseURL)

const instance = axios.create({
  baseURL: baseURL, //import.meta.env.VITE_API,
  timeout: 1000 * 300 // 5 min = 300 secs
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

instance.interceptors.request.use(
  config => {
    // const currentUrl = new URL(config.url, config.baseURL)
    // console.log(currentUrl)
    // const route = useRoute()
    // const hash = route.params.hash
    // console.log(hash)

    // config.params = { my_variable: 'value' }
    // return config

    // TODO: El token debe ser la auorizacion de uso.. es decir el que se genere con el tauri por la aplicacion instalada
    // TODO: deberá completarse con el app.conf !!!
    // let token = 'bearer'
    // config.headers.Authorization = token
    // console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
