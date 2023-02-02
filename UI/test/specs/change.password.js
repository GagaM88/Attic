const changePasswordPage = require('../pageobjects/change.password.page');
const loginPage = require('../pageobjects/login.page');
const loginData = require('../test.data/login.data');
const changePasswordData = require('../test.data/change.password.data');

describe('ChangePassword Page', () => {
  beforeEach(async () => {
    await loginPage.open();

    await loginPage.login(loginData.email, changePasswordData.currentPassword);
    
    await browser.waitUntil(() => $('.sc-cTQhss').isDisplayed({ timeout: 5000 }));

    await changePasswordPage.open();
  });

  it('should be able to change password', async () => {
    await changePasswordPage.changePassword(
      changePasswordData.currentPassword,
      changePasswordData.newPassword,
      changePasswordData.newPassword,
    );
    await changePasswordPage.profileIconFunctional();
    await changePasswordPage.signOutButton.click();

    await loginPage.login(loginData.email, changePasswordData.newPassword);


  });
  it('should not be able to change password with invalid new password', async () => {
    await changePasswordPage.changePassword(
      changePasswordData.currentPassword,
      changePasswordData.invalidPassword,
      null
    );
    await expect(changePasswordPage.errorMessageNewPassword).toHaveText(
      changePasswordData.errorMessageNewPassword);
  });

  it('should not be able to change password if new password and confirm new password does not match', async () => {
    await changePasswordPage.changePassword(
      changePasswordData.currentPassword,
      changePasswordData.newPassword,
      changePasswordData.invalidPassword
    );
    await expect(changePasswordPage.errorMessageNotMatchPasswords).toHaveText(
      changePasswordData.passwordDoNotMatchMessage);
  });
});
