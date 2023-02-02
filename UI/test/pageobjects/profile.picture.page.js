const page = require('./page');

class ProfilePicturePage extends page {
  get uploadProfilePictureButton() {
    return $('#upload_profile_picture_button_id');
  }
  get inputFile() {
    return $('input:last-child');
  }
  get profilePicture() {
    return $('#profile_picture_id');
  }
  get removeButton() {
    return $('#remove_profile_picture_button_id');
  }
  get profilePictureUploadError() {
    return $('#error_upload_profile_picture_id');
  }
  get pictureVisibility() {
    return $('.sc-cTQhss');
  }
   
  open() {
    return super.open('personal_information');
  }

  async uploadProfilePicture() {
    await this.uploadProfilePictureButton.click();

  }
}

module.exports = new ProfilePicturePage();