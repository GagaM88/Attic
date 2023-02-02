const registerPage = require('../pageobjects/register.page');
const successfullyRegisterPage = require('../pageobjects/successfully.register.page');
const registerData = require('../test.data/register.data');

describe('Registration Page', () => {
  beforeEach(async () => {
    await registerPage.open();
  });
  it('should register with valid input', async () => {
    await registerPage.register(registerData.validFirstName, registerData.validLastName, registerData.validEmail, registerData.validPassword, registerData.validPassword, registerData.validState, registerData.validAddress);
    await expect(successfullyRegisterPage.messageSuccessfullyRegister).toBeExisting();
    await expect(successfullyRegisterPage.messageSuccessfullyRegister).toHaveText('You have successfully registered.');
    await expect(browser).toHaveUrlContaining('/successfull_registration');
  });

  it('should not sign up with all mandatory fields empty', async () => {
    await registerPage.buttonSignIn.click();
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorFirstName).toHaveText(registerData.messageErrorRequiredField);
    await expect(registerPage.messageErrorLastName).toHaveText(registerData.messageErrorRequiredField);
    await expect(registerPage.messageErrorEmail).toHaveText(registerData.messageErrorRequiredField);
    await expect(registerPage.messageErrorPassword).toHaveText(registerData.messageErrorRequiredField);
    await expect(registerPage.messageErrorConfirmPassword).toHaveText(registerData.messageErrorRequiredField);
    await expect(registerPage.messageErrorState).toHaveText(registerData.messageErrorRequiredField);
    await expect(registerPage.messageErrorAddress).toHaveText(registerData.messageErrorRequiredField);
    await expect(registerPage.messageErrorTerms).toHaveText(registerData.messageErrorTerms);
  });

  it('should not register with invalid first name', async () => {
    await registerPage.register(registerData.invalidFirstName, registerData.validLastName, registerData.validEmail, registerData.validPassword, registerData.validPassword, registerData.validState, registerData.validAddress);
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorFirstName).toHaveText(registerData.messageErrorFirstName);
  });

  it('should not register with invalid last name', async () => {
    await registerPage.register(registerData.validFirstName, registerData.invalidLastName, registerData.validEmail, registerData.validPassword, registerData.validPassword, registerData.validState, registerData.validAddress);
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorLastName).toHaveText(registerData.messageErrorLastName);
  });

  it('should not register with invalid email', async () => {
    await registerPage.register(registerData.validFirstName, registerData.validLastName, registerData.invalidEmail, registerData.validPassword, registerData.validPassword, registerData.validState, registerData.validAddress);
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorEmail).toHaveText(registerData.messageErrorEmail);
  });

  it('should not register with email that already exists', async () => {
    await registerPage.register(registerData.validFirstName, registerData.validLastName, registerData.validEmail, registerData.validPassword, registerData.validPassword, registerData.validState, registerData.validAddress);
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorEmail).toHaveText(registerData.messageErrorEmailExists);
  });

  it('should not register with invalid password', async () => {
    await registerPage.register(registerData.validFirstName, registerData.validLastName, registerData.validEmail, registerData.invalidPassword, registerData.validPassword, registerData.validState, registerData.validAddress);
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorPassword).toHaveText(registerData.messageErrorPassword);
  });

  it('should not register if password and confirm password does not match', async () => {
    await registerPage.register(registerData.validFirstName, registerData.validLastName, registerData.validEmail, registerData.validPassword, registerData.invalidPassword, registerData.validState, registerData.validAddress);
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorConfirmPassword).toHaveText(registerData.messageErrorConfirmPassword);
  });

  it('should not register with invalid state', async () => {
    await registerPage.register(registerData.validFirstName, registerData.validLastName, registerData.validEmail, registerData.validPassword, registerData.validPassword, registerData.invalidState, registerData.validAddress);
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorState).toHaveText(registerData.messageErrorState);
  });

  it('should not register with invalid address', async () => {
    await registerPage.register(registerData.validFirstName, registerData.validLastName, registerData.validEmail, registerData.validPassword, registerData.validPassword, registerData.validState, registerData.invalidAddress);
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorAddress).toHaveText(registerData.messageErrorAddress);
  });

  it('should view icon in "Password" field be functional', async () => {
    await registerPage.inputPassword.setValue(registerData.validPassword);
    await registerPage.passwordIconView.click();
    const textPassword = await registerPage.inputPassword.getValue();
    expect(textPassword).toBe(registerData.validPassword);
  });

  it('should view icon in "Confirm password" field be functional', async () => {
    await registerPage.inputConfirmPassword.setValue(registerData.validPassword);
    await registerPage.confirmPasswordIconView.click();
    const textConfirmPassword = await registerPage.inputConfirmPassword.getValue();
    expect(textConfirmPassword).toBe(registerData.validPassword);
  });

  it('should not register with "Terms and conditions" checkbox unchecked', async () => {
    await registerPage.inputFirstName.setValue(registerData.validFirstName);
    await registerPage.inputLastName.setValue(registerData.validLastName);
    await registerPage.inputEmail.setValue(registerData.validEmail);
    await registerPage.inputPassword.setValue(registerData.validPassword);
    await registerPage.inputConfirmPassword.setValue(registerData.validPassword);
    await registerPage.inputState.setValue(registerData.validState);
    await registerPage.inputAddress.setValue(registerData.validAddress);
    await registerPage.buttonSignIn.click();
    await expect(browser).toHaveUrlContaining('/signup');
    await expect(registerPage.messageErrorTerms).toHaveText(registerData.messageErrorTerms);
  });
});
