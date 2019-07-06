import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["inputUrl", "output"]
  
  generate() {
    const curlPrefix = "curl"
    const inputUrlElement = this.inputUrlTarget
    const outputElement = this.outputTarget
    const url = inputUrlElement.value

    outputElement.innerText = `${curlPrefix} ${url}`
  }
}
