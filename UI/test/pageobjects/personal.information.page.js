const page = require('./page');

class PersonalInformationPage extends page {
  get inputNewFirstName() {
    return $('#personal_information_input_firstName');
  }

  get inputNewLastName() {
    return $('#personal_information_input_lastName');
  }

  get inputNewState() {
    return $('#personal_information_input_country');
  }

  get inputNewAddress() {
    return $('#personal_information_input_address');
  }

  get saveButton() {
    return $('#personal_information_button_save');
  }

  get profileIcon() {
    return $('#header_clickable_profile_picture');
  }

  get nameOfUserInDropDownMenu() {
    return $('#header_dropdown_menu_name_of_user');
  }

  get messageErrorNewFirstName() {
    return $('#personal_information_input_firstName_error_message');
  }

  get messageErrorNewLastName() {
    return $('#personal_information_input_lastName_error_message');
  }

  get messageErrorNewAddress() {
    return $('#personal_information_input_address_error_message');
  }

  get messageErrorNewState() {
    return $('#personal_information_input_country_error_message');
  }

  get messageErrorData() {
    return $('#personal_information_error_from_server_id');
  }

  async personalInformation(newFirstName, newLastName, newState, newAddress) {
    await this.inputNewFirstName.setValue(newFirstName);
    await this.inputNewLastName.setValue(newLastName);
    await this.inputNewState.setValue(newState);
    await this.inputNewAddress.setValue(newAddress);
    await this.saveButton.click();
  }

  open() {
    return super.open('personal_information');
  }

  async profileIconFunctional() {
    await this.profileIcon.click();
  }

}

module.exports = new PersonalInformationPage();
