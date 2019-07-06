const BaseHelper = require('../helpers/base_helper');

module.exports = {
    'Given empty url input, click generate button should display output properly' : function (browser) {
      const helper = new BaseHelper(browser)
      helper.openApp()
      helper.clickGenerateButton()
        .pause(500)
        .assert.containsText('code[id=syntaxOutput]', 'curl')
        .end();
    },

    'Given valid url input, click generate button should display input url' : function (browser) {
      const helper = new BaseHelper(browser)
      helper.openApp()
      helper.inputUrl('localhost:8080/get')
      helper.clickGenerateButton()
          .pause(500)
          .assert.containsText('code[id=syntaxOutput]', 'curl localhost:8080/get')
          .end();
      }
};