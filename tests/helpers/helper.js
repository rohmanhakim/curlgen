module.exports = Helper

function Helper(browser) {
    this.browser = browser
}

Helper.prototype.openApp = function() {
    return this.browser.url('http://localhost:8087')
}

Helper.prototype.clickGenerateButton = function() {
    const buttonGenerate = 'button[id=buttonGenerate]'
    return this.browser
        .waitForElementVisible(buttonGenerate)
        .click(buttonGenerate)
}

Helper.prototype.inputUrl = function(url) {
    const inputUrl = 'input[id=inputUrl]'
    return this.browser
        .waitForElementVisible(inputUrl)
        .setValue(inputUrl,url)
}

Helper.prototype.openHeaderTab = function() {
    const tabHeader = 'a[id=tabHeader]'
    return this.browser
        .waitForElementVisible(tabHeader)
        .click(tabHeader)
}

Helper.prototype.openAuthTab = function() {
    const tabAuth = 'a[id=tabAuth]'
    return this.browser
        .waitForElementVisible(tabAuth)
        .click(tabAuth)
}

Helper.prototype.clickAddHeader = function() {
    const buttonAddHeader = 'button[id=buttonAddHeader]'
    return this.browser
        .waitForElementVisible(buttonAddHeader)
        .click(buttonAddHeader)
}

Helper.prototype.inputHeader = function(position, key, value) {
    const idKey = `inputHeaderKey${position}`
    const idValue = `inputHeaderValue${position}`
    const inputKey = 'input[id=' + idKey + ']'
    const inputValue = 'input[id=' + idValue +']'
    return this.browser
        .waitForElementVisible(inputKey)
        .setValue(inputKey, key)
        .waitForElementVisible(inputValue)
        .setValue(inputValue, value)
}

Helper.prototype.clickRemoveHeader = function(position) {
    const idButton = `buttonRemoveHeader${position}`
    const removeHeaderButton = 'button[id=' + idButton + ']'
    return this.browser
        .waitForElementVisible(removeHeaderButton)
        .click(removeHeaderButton)
}

Helper.prototype.selectAuthType = function(authType) {
    const inputAuthType = 'select[id=inputAuthType]'
    return this.browser
        .waitForElementVisible(inputAuthType)
        .click(inputAuthType + ` option[value=${authType}]`)

}

Helper.prototype.inputAuthUsername = function(username) {
    const inputUsername = 'input[placeholder=Username]'
    return this.browser
        .waitForElementVisible(inputUsername)
        .setValue(inputUsername,username)
}

Helper.prototype.inputAuthPassword = function(password) {
    const inputPassword = 'input[placeholder=Password]'
    return this.browser
        .waitForElementVisible(inputPassword)
        .setValue(inputPassword,password)
}

Helper.prototype.inputAuthToken = function(token) {
    const inputToken = 'input[placeholder=Token]'
    return this.browser
        .waitForElementVisible(inputToken)
        .setValue(inputToken,token)
}