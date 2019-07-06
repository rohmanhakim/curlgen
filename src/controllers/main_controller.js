import { Controller } from "stimulus"
import HeaderHandler from "../handler/header_handler"
import AuthHandler from "../handler/auth_handler"

export default class extends Controller {
  static targets = [
    "inputUrl",
    "tabHeader",
    "tabAuth",
    "inputAuthType", 
    "output"
  ]

  inputUrl
  outputCode

  headerHandler
  authHandler

  initialize() {
    this.inputUrl = this.inputUrlTarget
    this.outputCode = this.outputTarget

    this.headerHandler = new HeaderHandler(this.tabHeaderTarget)
    this.authHandler = new AuthHandler(this.tabAuthTarget, this.inputAuthTypeTarget)
  }

  parse(auth) {
    var authString = ''
    switch(auth.type) {
      case 'no-auth':
        break;
      case 'basic':
        authString = `-u ${auth.username}:${auth.password} --basic `
        break;
      case 'digest':
        authString = `-u ${auth.username}:${auth.password} --digest `
        break;
      case 'ntlm':
        authString = `-u ${auth.username}:${auth.password} --ntlm `
        break;
      case 'bearer':
        authString = `-H 'Authorization: Bearer ${auth.token}' `
        break;
      default:
        authString = ''
        break;
    }
    return authString
  }

  generate() {
    const curlPrefix = "curl "
    const url = this.inputUrl.value

    const headers = this.headerHandler.getHeaders()
    const auth = this.parse(this.authHandler.getAuth())

    const output = curlPrefix + headers + auth + url

    this.outputCode.innerText = output
  }

  addHeader() {
    this.headerHandler.addHeader()
  }

  removeHeader(event) {
    this.headerHandler.removeHeader(event.currentTarget.parentNode.parentNode)
  }

  addAuth() {
    this.authHandler.addAuth()
  }
}
