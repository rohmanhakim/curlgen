import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["tabHeader", "inputUrl", "output"]
  
  tabHeader
  inputUrl
  outputCode

  initialize() {
    this.tabHeader = this.tabHeaderTarget
    this.inputUrl = this.inputUrlTarget
    this.outputCode = this.outputTarget
  }

  generate() {
    const curlPrefix = "curl "
    const url = this.inputUrl.value

    const headers = this.getHeaders()

    const output = curlPrefix + headers + url

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
}
