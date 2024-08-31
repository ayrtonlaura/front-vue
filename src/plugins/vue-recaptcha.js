import { VueReCaptcha } from 'vue-recaptcha-v3'

// https://www.google.com/recaptcha/admin/site/597556736

export function registrar(app) {
  app.use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA_KEY,
    loaderOptions: {
      useRecaptchaNet: true
    }
  })
}
