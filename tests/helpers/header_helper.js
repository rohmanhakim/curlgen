module.exports = HeaderHelper

function HeaderHelper(browser) {
    this.browser = browser
}

HeaderHelper.prototype.openHeaderTab = function() {
    const tabHeader = 'a[id=tabHeader]'
    return this.browser
        .waitForElementVisible(tabHeader)
        .click(tabHeader)
}

HeaderHelper.prototype.clickAddHeader = function() {
    const buttonAddHeader = 'button[id=buttonAddHeader]'
    return this.browser
        .waitForElementVisible(buttonAddHeader)
        .click(buttonAddHeader)
}

HeaderHelper.prototype.inputHeader = function(position, key, value) {
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

HeaderHelper.prototype.clickRemoveHeader = function(position) {
    const idButton = `buttonRemoveHeader${position}`
    const removeHeaderButton = 'button[id=' + idButton + ']'
    return this.browser
        .waitForElementVisible(removeHeaderButton)
        .click(removeHeaderButton)
}
