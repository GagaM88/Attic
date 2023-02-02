const page = require('./page');

class RegisterPage extends page {
  get inputFirstName() {
    return $('#registration_input_firstName');
  }

  get inputLastName() {
    return $('#registration_input_lastName');
  }

  get inputEmail() {
    return $('#registration_input_email');
  }

  get inputPassword() {
    return $('#registration_input_password');
  }

  get inputConfirmPassword() {
    return $('#registration_input_confirm_password');
  }

  get inputState() {
    return $('#registration_input_country');
  }

  get inputAddress() {
    return $('#registration_input_address');
  }

  get checkboxTerms() {
    return $('#checkbox_terms_and_conditions');
  }

  get buttonSignIn() {
    return $('#registration_button_sign_up');
  }

  get messageErrorFirstName() {
    return $('#registration_input_firstName_error_message');
  }

  get messageErrorLastName() {
    return $('#registration_input_lastName_error_message');
  }

  get messageErrorEmail() {
    return $('#registration_input_email_error_message');
  }

  get messageErrorPassword() {
    return $('#registration_input_password_error_message');
  }

  get messageErrorConfirmPassword() {
    return $('#registration_input_confirm_password_error_message');
  }

  get messageErrorState() {
    return $('#registration_input_country_error_message');
  }

  get messageErrorAddress() {
    return $('#registration_input_address_error_message');
  }

  get messageErrorTerms() {
    return $('#registration_input_terms_and_conditions_error_message');
  }

  get passwordIconView() {
    return $('#registration_input_password_show_password_icon');
  }

  get confirmPasswordIconView() {
    return $('#registration_input_password_show_confirm_password_icon');
  }

  async register(firstName, lastName, email, password, confirmPassword, state, address) {
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.inputConfirmPassword.setValue(confirmPassword);
    await this.inputState.setValue(state);
    await this.inputAddress.setValue(address);
    await this.checkboxTerms.click();
    await this.buttonSignIn.click();
  }

  open() {
    return super.open('signup');
  }
}

module.exports = new RegisterPage();
