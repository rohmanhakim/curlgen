const Helper = require('../helpers/helper');

module.exports = {
    'Given valid header, click generate should show output syntax correctly' : function (browser) {
      const helper = new Helper(browser)
      helper.openApp()
      helper.inputUrl('localhost:8080/get')
      helper.clickAddHeader()
      helper.inputHeader(0,'firstKey','firstValue')
      helper.clickAddHeader()
      helper.inputHeader(1,'secondKey','secondValue')
      helper.clickGenerateButton()
          .pause(500)
          .assert.containsText(
            'code[id=syntaxOutput]', 
            `curl -H 'firstKey: firstValue' -H 'secondKey: secondValue' localhost:8080/get`)
          .end();
    },

    'Given valid header, remove some of them, click generate should show output syntax correctly' : function (browser) {
        const helper = new Helper(browser)
        helper.openApp()
        helper.inputUrl('localhost:8080/get')
        helper.clickAddHeader()
        helper.inputHeader(0,'firstKey','firstValue')
        helper.clickAddHeader()
        helper.inputHeader(1,'secondKey','secondValue')
        helper.clickAddHeader()
        helper.inputHeader(2,'thirdKey','thirdValue')
        helper.clickAddHeader()
        helper.inputHeader(3,'fourthKey','fourthValue')
        helper.clickAddHeader()
        helper.clickRemoveHeader(1)
        helper.clickRemoveHeader(2)
        helper.clickGenerateButton()
            .pause(500)
            .assert.containsText(
              'code[id=syntaxOutput]', 
              `curl -H 'firstKey: firstValue' -H 'fourthKey: fourthValue' localhost:8080/get`)
            .end();
      },
};