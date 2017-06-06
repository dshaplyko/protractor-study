// spec.js
describe('J2GA application', function() {
  var baseUrl = 'http://bmb-dev-weu-wkde-master.azurewebsites.net/?lg'
  var loginField = element(by.name('userName'));
  var passwordField = element(by.name('password'));
  var loginButton = element(by.css("button[type='submit']"));
  var alertMessage = element(by.css('.wk-alert-danger'));
  var searchBar = element(by.css('li input.tags-input-text'));

  var history = element.all(by.repeater('result in memory'));
  
  function login(login, password) {
    loginField.sendKeys(login);
    passwordField.sendKeys(password);
    loginButton.click();
  }

  beforeEach(function() {
    browser.get(baseUrl);
  });
  
  it('Login page should contain needed elements', function() {
    expect(loginField.isPresent()).toBe(true);
    expect(passwordField.isPresent()).toBe(true);
    expect(loginButton.isPresent()).toBe(true);
  });

  it('Should not allow to login using non-valid credentials', function() {
    loginField.sendKeys('aaa');
    passwordField.sendKeys('bbb');
    loginButton.click();
    expect(alertMessage.isPresent()).toBe(true);
  });

  it('Should login using valid credentials', function() {
    loginField.sendKeys('wkdefull19@wk.com');
    passwordField.sendKeys('password');
    loginButton.click();
    //Here we are waiting for the URL to be changed
    browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                return (url.indexOf(baseUrl + '#/bibliothek') !== -1);
            });
        });
  });

  it('Home page should contain needed values', function() {
    expect(searchBar.isPresent()).toBe(true);
    expect(searchBar.getAttribute('placeholder')).toEqual('Suchen Sie nach Begriffen, Aktenzeichen, Vorschriften, Gerichten, etc. ...')
  });










  
  /*it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator');
  });

  it('should add one and two', function(){
    firstNumber.sendKeys(1);
    secondNumber.sendKeys(2);
    
    goButton.click();
    
    expect(latestResult.getText()).toEqual('3');
  });
  
  it('should add four and six', function() {
    firstNumber.sendKeys('4');
    secondNumber.sendKeys('6');
    goButton.click();
    expect(latestResult.getText()).toEqual('10');
  });*/

});