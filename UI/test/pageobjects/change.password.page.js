const page = require('./page');

class ChangePasswordPage extends page {
  get inputCurrentPassword() {
    return $('#current_password');
  }
  get inputNewPassword() {
    return $('#new_password');
  }
  get inputConfirmNewPassword() {
    return $('#confirm_new_password');
  }
  get saveButton() {
    return $('#button_sign_in');
  }
  get signOutButton() {
    return $('#header_dropdown_menu_sign_out_button');
  }
  get profileIcon() {
    return $('#header_clickable_profile_picture');
  }
  get errorMessageNewPassword() {
    return $$('.sc-gsnTZi')[1];
  }
  get errorMessageNotMatchPasswords() {
    return $$('.sc-bczRLJ')[2];
  }

  async changePassword(currentPassword, newPassword, newConfirmPassword) {
    await this.inputCurrentPassword.setValue(currentPassword);
    await this.inputNewPassword.setValue(newPassword);
    await this.inputConfirmNewPassword.setValue(newConfirmPassword);
    await this.saveButton.click();
  }

  open() {
    return super.open('change_password');
  }

  async profileIconFunctional() {
    await this.profileIcon.click();
  }

}

module.exports = new ChangePasswordPage();