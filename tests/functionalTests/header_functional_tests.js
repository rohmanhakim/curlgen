const BaseHelper = require('../helpers/base_helper');
const HeaderHelper = require('../helpers/header_helper');

module.exports = {
    'Given valid header, click generate should show output syntax correctly' : function (browser) {
      const baseHelper = new BaseHelper(browser)
      const headerHelper = new HeaderHelper(browser)
      baseHelper.openApp()
      baseHelper.inputUrl('localhost:8080/get')
      headerHelper.clickAddHeader()
      headerHelper.inputHeader(0,'firstKey','firstValue')
      headerHelper.clickAddHeader()
      headerHelper.inputHeader(1,'secondKey','secondValue')
      baseHelper.clickGenerateButton()
          .pause(500)
          .assert.containsText(
            'code[id=syntaxOutput]', 
            `curl -H 'firstKey: firstValue' -H 'secondKey: secondValue' localhost:8080/get`)
          .end();
    },

    'Given valid header, remove some of them, click generate should show output syntax correctly' : function (browser) {
      const baseHelper = new BaseHelper(browser)
      const headerHelper = new HeaderHelper(browser)
      baseHelper.openApp()
      baseHelper.inputUrl('localhost:8080/get')
      headerHelper.clickAddHeader()
      headerHelper.inputHeader(0,'firstKey','firstValue')
      headerHelper.clickAddHeader()
      headerHelper.inputHeader(1,'secondKey','secondValue')
      headerHelper.clickAddHeader()
      headerHelper.inputHeader(2,'thirdKey','thirdValue')
      headerHelper.clickAddHeader()
      headerHelper.inputHeader(3,'fourthKey','fourthValue')
      headerHelper.clickAddHeader()
      headerHelper.clickRemoveHeader(1)
      headerHelper.clickRemoveHeader(2)
      baseHelper.clickGenerateButton()
          .pause(500)
          .assert.containsText(
            'code[id=syntaxOutput]', 
            `curl -H 'firstKey: firstValue' -H 'fourthKey: fourthValue' localhost:8080/get`)
          .end();
    },
};