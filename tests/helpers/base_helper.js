module.exports = BaseHelper

function BaseHelper(browser) {
    this.browser = browser
}

BaseHelper.prototype.openApp = function() {
    return this.browser.url('http://localhost:8087')
}

BaseHelper.prototype.clickGenerateButton = function() {
    const buttonGenerate = 'button[id=buttonGenerate]'
    return this.browser
        .waitForElementVisible(buttonGenerate)
        .click(buttonGenerate)
}

BaseHelper.prototype.inputUrl = function(url) {
    const inputUrl = 'input[id=inputUrl]'
    return this.browser
        .waitForElementVisible(inputUrl)
        .setValue(inputUrl,url)
}

BaseHelper.prototype.assertOutput = function(output) {
    const outputTextArea = 'textarea[id=syntaxOutput]'
    return this.browser
        .pause(500)
        .assert.value(outputTextArea, output)
}