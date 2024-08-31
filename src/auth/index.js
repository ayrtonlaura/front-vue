import CryptoJS from 'crypto-js'
import { jwtDecode } from 'jwt-decode'

const secret = '0Hn4URcLSI1hIFXVxNheQh1iarSUgngMsUjxH19joRZfBAF7XttzxI3bb2OavGFh'

// https://stackblitz.com/edit/encrypt-decrypt-cryptojs-client-and-php-server?file=app%2Fapp.component.ts

const CryptoJSAesJson = {
  stringify: function (cipherParams) {
    const vbJsonString = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
    }
    if (cipherParams.iv) {
      vbJsonString['iv'] = cipherParams.iv.toString()
    }
    if (cipherParams.salt) {
      vbJsonString['s'] = cipherParams.salt.toString()
    }
    return JSON.stringify(vbJsonString)
  },
  parse: function (jsonStr) {
    const vbJsonParse = JSON.parse(jsonStr)
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(vbJsonParse.ct)
    })
    if (vbJsonParse.iv) {
      cipherParams['iv'] = CryptoJS.enc.Hex.parse(vbJsonParse.iv)
    }
    if (vbJsonParse['s']) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(vbJsonParse.s)
    }
    return cipherParams
  }
}

export default {
  setUserLogged(hash, data) {
    let xhash = hash.trim()
    sessionStorage.setItem(`${xhash}_tkn`, data.token)
    sessionStorage.setItem(xhash, data.opciones)
  },

  getUserSession(h) {
    return {
      token: sessionStorage.getItem(`${h}_tkn`),
      opciones: sessionStorage.getItem(h)
    }
  },

  getUserLogged(h) {
    let hash = sessionStorage.getItem(h)
    if (hash) {
      var jwtDecoded = jwtDecode(hash)
      let encrypted = JSON.parse(atob(jwtDecoded.sub))
      const decrypted = JSON.parse(CryptoJS.AES.decrypt(encrypted, secret, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8))
      // console.log(`decrypted:`, decrypted)
      return decrypted
    } else {
      return false
    }
  },

  logout(h) {
    sessionStorage.removeItem(h)
    sessionStorage.removeItem(`${h}_tkn`)
  }
}
