import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    "inputUrl",
    "tabHeader",
    "tabAuth",
    "inputAuthType", 
    "output"
  ]

  inputUrl
  tabHeader
  tabAuth
  inputAuthType
  outputCode

  initialize() {
    this.inputUrl = this.inputUrlTarget
    this.tabHeader = this.tabHeaderTarget
    this.tabAuth = this.tabAuthTarget
    this.inputAuthType = this.inputAuthTypeTarget
    this.outputCode = this.outputTarget
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

    const headers = this.getHeaders()
    const auth = this.parse(this.getAuth())

    const output = curlPrefix + headers + auth + url

    this.outputCode.innerText = output
  }

  addHeader() {
    var headerElement = document.createElement("DIV")
    const totalHeader = this.tabHeader.childElementCount
    headerElement.className = "row"
    headerElement.id = `header${totalHeader}`
    headerElement.innerHTML = `<div class="five columns">
          <input id="inputHeaderKey${totalHeader}" class="u-full-width" type="text" placeholder="key">
        </div>
        <div class="five columns">
          <input id="inputHeaderValue${totalHeader}" class="u-full-width" type="text" placeholder="value">
        </div>
        <div class="two columns">
          <button id="buttonRemoveHeader${totalHeader}" data-action="click->main#removeHeader">Remove</button>
        </div>`

    this.tabHeader.appendChild(headerElement)
  }

  removeHeader(event) {
    const headerElementToRemove = event.currentTarget.parentNode.parentNode
    this.tabHeader.removeChild(headerElementToRemove)
  }

  getHeaders() {
    const headerElements = Array.from(this.tabHeader.children)
    return headerElements
    .filter(header => (
      header.children[0].firstElementChild.value !== "" 
      || header.children[1].firstElementChild.value !== "" 
    ))
    .map(header => 
      ({ 
        key: `${header.children[0].firstElementChild.value}`, 
        value: `${header.children[1].firstElementChild.value}` 
      })  
    ).map(header => (
      `-H '${header.key}: ${header.value}' `
    )).join("")
  }

  addAuth() {
    const authType = this.inputAuthType.value
    var authElement = document.createElement("DIV")
    authElement.className = "row"
    authElement.id = `formAuth`
    
    switch(authType) {
      case 'no-auth':
        authElement.innerHTML = ''
        break;
      case 'basic':
        authElement.innerHTML = this.createAuthFormHtml('Basic')
        break;
      case 'digest':
        authElement.innerHTML = this.createAuthFormHtml('Digest')
        break;
      case 'ntlm':
        authElement.innerHTML = this.createAuthFormHtml('Ntlm')
        break;
      case 'bearer':
        authElement.innerHTML = `<div class="twelve columns">
            <input id="inputBearerAuthToken" class="u-full-width" type="text" placeholder="Token">
        </div>`
        break;
      default:
        authElement.innerHTML = ''
    }
    this.tabAuth.removeChild(this.tabAuth.lastElementChild)
    this.tabAuth.appendChild(authElement)
  }

  getAuth() {
    const authElement = this.tabAuth.lastElementChild
    const authType = this.inputAuthType.value
    var auth = { type: authType }
    if(authType === 'bearer') {
      const token = authElement.firstElementChild.firstElementChild.value
      auth['token'] = token
    } else if (
      authType === 'basic'
      || authType === 'digest'
      || authType === 'ntlm'
    ) {
      const username = authElement.firstElementChild.firstElementChild.value
      const password = authElement.lastElementChild.firstElementChild.value
      auth.username = username
      auth.password = password
    }

    return auth
  }

  createAuthFormHtml(authType) {
    return `<div class="six columns">
          <input id="input${authType}AuthUsername" class="u-full-width" type="text" placeholder="Username">
      </div>
      <div class="six columns">
          <input id="input${authType}AuthPassword" class="u-full-width" type="text" placeholder="Password">
      </div>`
  }
}
