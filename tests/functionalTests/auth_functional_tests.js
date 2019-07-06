const Helper = require('../helpers/helper');

module.exports = {
    'Given no authentication, click generate should show output syntax correctly' : function (browser) {
        const helper = new Helper(browser)
        helper.openApp()
        helper.inputUrl('localhost:8080/get')
        helper.openAuthTab()
        helper.selectAuthType('no-auth')
        helper.clickGenerateButton()
          .pause(500)
          .assert.containsText(
            'code[id=syntaxOutput]', 
            `curl localhost:8080/get`)
          .end();
    },

    'Given valid basic auth, click generate should show output syntax correctly' : function (browser) {
        const helper = new Helper(browser)
        helper.openApp()
        helper.inputUrl('localhost:8080/get')
        helper.openAuthTab()
        helper.selectAuthType('basic')
        helper.inputAuthUsername('myusername')
        helper.inputAuthPassword('mypassword')
        helper.clickGenerateButton()
          .pause(500)
          .assert.containsText(
            'code[id=syntaxOutput]', 
            `curl -u myusername:mypassword --basic localhost:8080/get`)
          .end();
    },

    'Given valid digest auth, click generate should show output syntax correctly' : function (browser) {
        const helper = new Helper(browser)
        helper.openApp()
        helper.inputUrl('localhost:8080/get')
        helper.openAuthTab()
        helper.selectAuthType('digest')
        helper.inputAuthUsername('myusername')
        helper.inputAuthPassword('mypassword')
        helper.clickGenerateButton()
          .pause(500)
          .assert.containsText(
            'code[id=syntaxOutput]', 
            `curl -u myusername:mypassword --digest localhost:8080/get`)
          .end();
    },

    'Given valid NTLM auth, click generate should show output syntax correctly' : function (browser) {
        const helper = new Helper(browser)
        helper.openApp()
        helper.inputUrl('localhost:8080/get')
        helper.openAuthTab()
        helper.selectAuthType('ntlm')
        helper.inputAuthUsername('myusername')
        helper.inputAuthPassword('mypassword')
        helper.clickGenerateButton()
          .pause(500)
          .assert.containsText(
            'code[id=syntaxOutput]', 
            `curl -u myusername:mypassword --ntlm localhost:8080/get`)
          .end();
    },

    'Given valid bearer auth, click generate should show output syntax correctly' : function (browser) {
        const helper = new Helper(browser)
        helper.openApp()
        helper.inputUrl('localhost:8080/get')
        helper.openAuthTab()
        helper.selectAuthType('bearer')
        helper.inputAuthToken('abc-def-ghi-jkl-mno')
        helper.clickGenerateButton()
          .pause(500)
          .assert.containsText(
            'code[id=syntaxOutput]', 
            `curl -H 'Authorization: Bearer abc-def-ghi-jkl-mno' localhost:8080/get`)
          .end();
    }
};