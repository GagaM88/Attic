const loginPage = require('../pageobjects/login.page');
const loginData = require('../test.data/login.data');

describe('Login page', () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  it('should login with valid credencials', async () => {
    await loginPage.login(loginData.email, loginData.password);
    await expect(loginPage.atticStorageText).toBeExisting();
    await expect(loginPage.atticStorageText).toHaveTextContaining('Attic storage');

  });

  it('shouldn`t login with wrong email and valid password', async () => {
    await loginPage.login(loginData.invalidEmail, loginData.password);
    await expect(loginPage.errorMessageForInvalidEmailOrPass).toBeExisting();
    await expect(loginPage.errorMessageForInvalidEmailOrPass).toHaveTextContaining('Email address or password is incorrect');
  });

  it('shouldn`t login with valid email and wrong password', async () => {
    await loginPage.login(loginData.email, loginData.invalidPassword);
    await expect(loginPage.errorMessageForInvalidEmailOrPass).toBeExisting();
    await expect(loginPage.errorMessageForInvalidEmailOrPass).toHaveTextContaining('Email address or password is incorrect');
  });

  it('shouldn`t login with empty email', async () => {
    await loginPage.login('', loginData.password);
    await expect(loginPage.emailErrorMessage).toBeExisting();
    await expect(loginPage.emailErrorMessage).toHaveTextContaining('*This filed is required');
  });

  it('shouldn`t login with empty password', async () => {
    await loginPage.login(loginData.email, '');
    await expect(loginPage.passwordErrorMessage).toBeExisting();
    await expect(loginPage.passwordErrorMessage).toHaveTextContaining('*This filed is required');
  });

  it('shouldn`t login with email and password field empty', async () => {
    await loginPage.login('', '');
    await expect(loginPage.emailErrorMessage).toBeExisting();
    await expect(loginPage.emailErrorMessage).toHaveTextContaining('*This filed is required');
    await expect(loginPage.passwordErrorMessage).toBeExisting();
    await expect(loginPage.passwordErrorMessage).toHaveTextContaining('*This filed is required');
  });

  it('should view icon in "Password" field is functional', async () => {
    await loginPage.passwordInputField.setValue(loginData.password);
    expect(loginPage.passwordInputField).toHaveAttribute('type', 'password');
    await loginPage.passIcon.click();
    expect(loginPage.passwordInputField).toHaveValue(loginData.password);
    await expect(loginPage.passwordInputField).toHaveAttribute('type', 'text');
  });

  it('should Sign up link is functional', async () => {
    await loginPage.signUpLinkFunctional();
    await expect(browser).toHaveUrlContaining('/signup');
  });
});
