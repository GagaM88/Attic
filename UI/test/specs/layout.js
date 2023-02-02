const layoutPage = require('../pageobjects/layout.page');
const loginPage = require('../pageobjects/login.page');
const loginData = require('../test.data/login.data');

describe('Layout page', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login(loginData.email, loginData.password);
  });

  it('should "Profile icon" is functional', async () => {
    await layoutPage.profileIconFunctional();
    await expect(browser).toHaveUrl(browser.options.baseUrl);
  });

  it('should "Profile icon" dropdown contains name and surname', async () => {
    await layoutPage.profileIconFunctional();
    await expect(layoutPage.profileNameOfUser).toHaveTextContaining('Dragana Mitrovic');
  });

  it('should "Sign out" button is functional', async () => {
    await layoutPage.profileIconFunctional();
    await layoutPage.clickSignOutButton();
    await expect(layoutPage.welcomeBackMessage).toBeExisting();
    await expect(layoutPage.welcomeBackMessage).toHaveTextContaining('Welcome back to Attic Storage');
  });

  it('should :Personal information" tab is functional', async () => {
    await layoutPage.profileIconFunctional();
    await layoutPage.personalInformationTabFunctional();
    await expect(browser).toHaveUrlContaining('/personal_information');
  });

  it('should "Change password" tab is functional', async () => {
    await layoutPage.profileIconFunctional();
    await layoutPage.changePasswordTabFunctional();
    await expect(browser).toHaveUrlContaining('/change_password');
  });

  it('should "Account management" side-bar item is functional', async () => {
    await layoutPage.accountManagmentSideBarFunctional();
    await expect(layoutPage.personalInformationSubItem).toBeExisting();
  });

  it('should "Personal information" sub-item is functional', async () => {
    await layoutPage.accountManagmentSideBarFunctional();
    await layoutPage.personalInformationSubItemFunctional();
    await expect(browser).toHaveUrlContaining('/personal_information');
  });

  it('should "Change password" sub-item is functional', async () => {
    await layoutPage.accountManagmentSideBarFunctional();
    await layoutPage.changePasswordSubItemFunctional();
    await expect(browser).toHaveUrlContaining('/change_password');
  });

  it('should "Statistics" sub-item is functional', async () => {
    await layoutPage.accountManagmentSideBarFunctional();
    await layoutPage.statisticsSubItemFunctional();
    await expect(browser).toHaveUrlContaining('/statistics');
  });
});
