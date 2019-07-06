module.exports = AuthHelper

function AuthHelper(browser) {
    this.browser = browser
}

AuthHelper.prototype.openAuthTab = function() {
    const tabAuth = 'a[id=tabAuth]'
    return this.browser
        .waitForElementVisible(tabAuth)
        .click(tabAuth)
}

AuthHelper.prototype.selectAuthType = function(authType) {
    const inputAuthType = 'select[id=inputAuthType]'
    return this.browser
        .waitForElementVisible(inputAuthType)
        .click(inputAuthType + ` option[value=${authType}]`)

}

AuthHelper.prototype.inputAuthUsername = function(username) {
    const inputUsername = 'input[placeholder=Username]'
    return this.browser
        .waitForElementVisible(inputUsername)
        .setValue(inputUsername,username)
}

AuthHelper.prototype.inputAuthPassword = function(password) {
    const inputPassword = 'input[placeholder=Password]'
    return this.browser
        .waitForElementVisible(inputPassword)
        .setValue(inputPassword,password)
}

AuthHelper.prototype.inputAuthToken = function(token) {
    const inputToken = 'input[placeholder=Token]'
    return this.browser
        .waitForElementVisible(inputToken)
        .setValue(inputToken,token)
}