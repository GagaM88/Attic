const page = require('./page');

class LayoutPage extends page {
  get profileIcon() {
    return $('#header_clickable_profile_picture');
  }

  get profileNameOfUser() {
    return $('#header_dropdown_menu_name_of_user');
  }

  get signOutButton() {
    return $('#header_dropdown_menu_sign_out_button');
  }

  get welcomeBackMessage() {
    return $('.sc-bBrHrO');
  }

  get personalInformationTab() {
    return $('#header_dropdown_menu_tab_personal_information');
  }

  get changePasswordTab() {
    return $('#header_dropdown_menu_tab_change_password');
  }

  get accountManagmentSideBarItem() {
    return $('.sc-hTtwUo.khqMac:nth-child(7)');
  }

  get personalInformationSubItem() {
    return $('#sidebar_subnav_personal_information_id');
  }

  get chanePasswordSubItem() {
    return $('#sidebar_subnav_change_password_id');
  }

  get statisticsSubItem() {
    return $('#sidebar_subnav_storage_details_id');
  }

  open() {
    return super.open('/');
  }

  async profileIconFunctional() {
    await this.profileIcon.click();
  }

  async clickSignOutButton() {
    await this.signOutButton.click();
  }

  async personalInformationTabFunctional() {
    await this.personalInformationTab.click();
  }

  async changePasswordTabFunctional() {
    await this.changePasswordTab.click();
  }

  async accountManagmentSideBarFunctional() {
    await this.accountManagmentSideBarItem.click();
  }

  async personalInformationSubItemFunctional() {
    await this.personalInformationSubItem.click();
  }

  async changePasswordSubItemFunctional() {
    await this.chanePasswordSubItem.click();
  }

  async statisticsSubItemFunctional() {
    await this.statisticsSubItem.click();
  }
}

module.exports = new LayoutPage();
