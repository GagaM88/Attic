const page = require('./page');

class LoginPage extends page {
  get emailInputField() {
    return $('#login_input_email');
  }

  get passwordInputField() {
    return $('#login_input_password');
  }

  get btnSignIn() {
    return $('#login_button_sign_in');
  }

  get passIcon() {
    return $('#login_input_password_show_password_icon');
  }

  get atticStorageText() {
    return $('.sc-cTQhss');
  }

  get errorMessageForInvalidEmailOrPass() {
    return $('#login_server_error_message');
  }

  get emailErrorMessage() {
    return $('#login_input_email_error_message');
  }

  get passwordErrorMessage() {
    return $('#login_input_password_error_message');
  }

  get signUpLink() {
    return $('#login_clickable_text_sign_up_redirect');
  }

  async login(email, password) {
    await this.emailInputField.setValue(email);
    await this.passwordInputField.setValue(password);
    await this.btnSignIn.click();
  }

  async passIconView(password) {
    await this.passwordInputField.setValue(password);
    await this.passIcon.click();
  }

  async signUpLinkFunctional() {
    await this.signUpLink.click();
  }

  open() {
    return super.open('signin');
  }
}

module.exports = new LoginPage();
