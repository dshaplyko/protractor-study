// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 11000,
  specs: ['./specs/*-spec.js'],
  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function() {
    browser.driver.manage().window().setSize(1280, 720);
    browser.manage().timeouts().implicitlyWait(5000);
  },

  jasmineNodeOpts: {
        showColors: true
  }

}