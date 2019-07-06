import { Controller } from "stimulus"
import HeaderHandler from "../handler/header_handler"
import AuthHandler from "../handler/auth_handler"
import Parser from "../parser/parser"
import * as CodeMirror from "codemirror"
import "codemirror/mode/shell/shell"

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
  outputCodeEditor

  parser

  initialize() {
    this.inputUrl = this.inputUrlTarget
    this.outputCode = this.outputTarget

    this.headerHandler = new HeaderHandler(this.tabHeaderTarget)
    this.authHandler = new AuthHandler(this.tabAuthTarget, this.inputAuthTypeTarget)
    this.parser = new Parser()

    this.outputCodeEditor = CodeMirror.fromTextArea(this.outputCode, {
      lineNumbers: false,
      mode: "shell",
      theme: "night",
      readOnly: false,
      lineWrapping: true
    })
  }

  generate() {
    const url = this.inputUrl.value

    const headers = this.headerHandler.getHeaders()
    const auth = this.authHandler.getAuth()

    const output = this.parser.parse(url, headers, auth)

    this.outputCode.value = output
    this.outputCodeEditor.setValue(this.outputCode.value)
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
