const loginPage = require('../pageobjects/login.page');
const loginData = require('../test.data/login.data');
const personalInformationPage = require('../pageobjects/personal.information.page');
const personalInformationData = require('../test.data/personal.information.data');

describe('PersonalInformation Page', () => {
  beforeEach(async () => {
    await loginPage.open();

    await loginPage.login(loginData.email, loginData.password);

    await browser.waitUntil(() => $('.sc-cTQhss').isDisplayed({ timeout: 5000 }));
   
    await personalInformationPage.open();
  });

  it('should be able to change all personal information', async () => {
    await personalInformationPage.personalInformation(
      personalInformationData.newFirstName,
      personalInformationData.newLastName,
      personalInformationData.newState,
      personalInformationData.newAddress
    );
    await personalInformationPage.profileIconFunctional();
    await expect(personalInformationPage.nameOfUserInDropDownMenu).toHaveText(
      `${personalInformationData.newFirstName} ${personalInformationData.newLastName}`
    );
  });

  it('should not change first name with invalid input', async () => {
    await personalInformationPage.personalInformation(
      personalInformationData.invalidNewFirstName,
      personalInformationData.newLastName,
      personalInformationData.newState,
      personalInformationData.newAddress
    );
    await expect(personalInformationPage.messageErrorNewFirstName).toHaveText(
      personalInformationData.messageErrorNewFirstName
    );
  });

  it('should not change last name with invalid input', async () => {
    await personalInformationPage.personalInformation(
      personalInformationData.newFirstName,
      personalInformationData.invalidNewLastName,
      personalInformationData.newState,
      personalInformationData.newAddress
    );
    await expect(personalInformationPage.messageErrorNewLastName).toHaveText(
      personalInformationData.messageErrorNewLastName
    );
  });

  it('should not change address with invalid input', async () => {
    await personalInformationPage.personalInformation(
      personalInformationData.newFirstName,
      personalInformationData.newLastName,
      personalInformationData.newState,
      personalInformationData.invalidNewAddress
    );
    await expect(personalInformationPage.messageErrorNewAddress).toHaveText(
      personalInformationData.messageErrorNewAddress
    );
  });

  it('should not change state with invalid input', async () => {
    await personalInformationPage.personalInformation(
      personalInformationData.newFirstName,
      personalInformationData.newLastName,
      personalInformationData.invalidNewState,
      personalInformationData.newAddress
    );
    await expect(personalInformationPage.messageErrorNewState).toHaveText(
      personalInformationData.messageErrorNewState
    );
  });

  it('should not change personal information with same input fields', async () => {
    await personalInformationPage.saveButton.click();
    await expect(personalInformationPage.messageErrorData).toHaveText(
      personalInformationData.messageErrorData
    );
  });

  it('should not change personal information with all mandatory fields empty', async () => {
    await personalInformationPage.personalInformation();

    await expect(personalInformationPage.messageErrorNewFirstName).toHaveText(
      personalInformationData.messageErrorRequiredField
    );
    await expect(personalInformationPage.messageErrorNewLastName).toHaveText(
      personalInformationData.messageErrorRequiredField
    );
    await expect(personalInformationPage.messageErrorNewAddress).toHaveText(
      personalInformationData.messageErrorRequiredField
    );
    await expect(personalInformationPage.messageErrorNewState).toHaveText(
      personalInformationData.messageErrorRequiredField
    );
  });
});
