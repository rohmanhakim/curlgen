const BaseHelper = require('../helpers/base_helper');
const AuthHelper = require('../helpers/auth_helper');

module.exports = {
    'Given no authentication, click generate should show output syntax correctly' : function (browser) {
        const baseHelper = new BaseHelper(browser)
        const authHelper = new AuthHelper(browser)

        baseHelper.openApp()
        baseHelper.inputUrl('localhost:8080/get')
        authHelper.openAuthTab()
        authHelper.selectAuthType('no-auth')
        baseHelper.clickGenerateButton()
        baseHelper.assertOutput(`curl localhost:8080/get`)
        .end();
    },

    'Given valid basic auth, click generate should show output syntax correctly' : function (browser) {
        const baseHelper = new BaseHelper(browser)
        const authHelper = new AuthHelper(browser)

        baseHelper.openApp()
        baseHelper.inputUrl('localhost:8080/get')
        authHelper.openAuthTab()
        authHelper.selectAuthType('basic')
        authHelper.inputAuthUsername('myusername')
        authHelper.inputAuthPassword('mypassword')
        baseHelper.clickGenerateButton()
        baseHelper.assertOutput(`curl -u myusername:mypassword --basic localhost:8080/get`)
        .end();
    },

    'Given valid digest auth, click generate should show output syntax correctly' : function (browser) {
        const baseHelper = new BaseHelper(browser)
        const authHelper = new AuthHelper(browser)

        baseHelper.openApp()
        baseHelper.inputUrl('localhost:8080/get')
        authHelper.openAuthTab()
        authHelper.selectAuthType('digest')
        authHelper.inputAuthUsername('myusername')
        authHelper.inputAuthPassword('mypassword')
        baseHelper.clickGenerateButton()
        baseHelper.assertOutput(`curl -u myusername:mypassword --digest localhost:8080/get`)
        .end();
    },

    'Given valid NTLM auth, click generate should show output syntax correctly' : function (browser) {
        const baseHelper = new BaseHelper(browser)
        const authHelper = new AuthHelper(browser)

        baseHelper.openApp()
        baseHelper.inputUrl('localhost:8080/get')
        authHelper.openAuthTab()
        authHelper.selectAuthType('ntlm')
        authHelper.inputAuthUsername('myusername')
        authHelper.inputAuthPassword('mypassword')
        baseHelper.clickGenerateButton()
        baseHelper.assertOutput(`curl -u myusername:mypassword --ntlm localhost:8080/get`)
        .end();
    },

    'Given valid bearer auth, click generate should show output syntax correctly' : function (browser) {
        const baseHelper = new BaseHelper(browser)
        const authHelper = new AuthHelper(browser)

        baseHelper.openApp()
        baseHelper.inputUrl('localhost:8080/get')
        authHelper.openAuthTab()
        authHelper.selectAuthType('bearer')
        authHelper.inputAuthToken('abc-def-ghi-jkl-mno')
        baseHelper.clickGenerateButton()
        baseHelper.assertOutput(`curl -H 'Authorization: Bearer abc-def-ghi-jkl-mno' localhost:8080/get`)
        .end();
    }
};