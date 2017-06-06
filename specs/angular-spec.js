// spec.js
describe('J2GA application', function() {
  //elements are stored here
  var baseUrl = 'http://bmb-dev-weu-wkde-master.azurewebsites.net/?lg'
  var loginField = element(by.name('userName'));
  var passwordField = element(by.name('password'));
  var loginButton = element(by.css("button[type='submit']"));
  var alertMessage = element(by.css('.wk-alert-danger'));
  var searchBar = element(by.css('li input.tags-input-text'));
  var logo = element(by.css('.wk-logo-large'));
  var logoutButton = element(by.css('.icon-keyhole'));

  var history = element.all(by.repeater('result in memory'));
  
  //method for login, it is not used at the moment:)
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
    //Here we have a stupid hack to invoke the shitty error message (since we have a bug in out app...)
    loginButton.click();
    loginButton.click();
    loginButton.click();
    loginButton.click();
    expect(alertMessage.isPresent()).toBe(true);
    expect(alertMessage.getText()).toContain(' Invalid credentials');
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
    expect(searchBar.getAttribute('placeholder')).toEqual('Suchen Sie nach Begriffen, Aktenzeichen, Vorschriften, Gerichten, etc. ...');
    expect(logo.isPresent()).toBe(true);
    expect(logoutButton.isPresent()).toBe(true);
  });

  it('should logout the user', function() {
    logoutButton.click();
     browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                return (url.indexOf(baseUrl + '#/lg') !== -1);
            });
        });
  });
});