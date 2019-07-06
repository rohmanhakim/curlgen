export default class AuthHandler {
    tabAuth
    inputAuthType

    constructor(tabAuth, inputAuthType) {
        this.tabAuth = tabAuth
        this.inputAuthType = inputAuthType
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