// spec.js
describe('Non angular application', function() {
  //elements are stored here
  var baseUrl = 'https://iamtest.herokuapp.com/#/login';
  var emailField = element(by.name('email'));
  var pass = element(by.name('password'));

  
  beforeEach(function() {
    browser.get(baseUrl);
    return browser.ignoreSynchronization = true;
  });
  
  it('Login page should contain needed elements', function() {
    emailField.sendKeys('aaaa');
    pass.sendKeys('bbbbb');
    browser.sleep("5000");
  });
});