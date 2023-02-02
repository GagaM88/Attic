const loginPage = require('../pageobjects/login.page');
const loginData = require('../test.data/login.data');
const personalInformationPage = require('../pageobjects/personal.information.page');
const profilePicturePage = require('../pageobjects/profile.picture.page')
const { normalPicturePath, biggerPicturePath, smallerPicturePath } = require('../test.data/profile.picture.data');
const helper = require('../utilities/helper');


describe('ProfilePicture Page', () => {
    beforeEach(async () => {
        await loginPage.open();

        await loginPage.login(loginData.email, loginData.password);
        
        await browser.waitUntil(() => (profilePicturePage.pictureVisibility).isDisplayed({ timeout: 5000 })); 

        await personalInformationPage.open();
    });


    it('should be able to upoload profile picture', async () => {
        await helper.uploadPicture(normalPicturePath);
       
        await expect(profilePicturePage.removeButton).toBeDisplayad;
    });

    it('should not be able to upoload profile picture bigger than 10MB', async () => {
        await helper.uploadPicture(biggerPicturePath);
 
        await expect(profilePicturePage.profilePictureUploadError).toHaveText('Maximum size of image is 10mb.');
    });

    it('should not be able to upoload profile picture smaller than 1000px', async () => {
        await helper.uploadPicture(smallerPicturePath);
    
        await expect(profilePicturePage.profilePictureUploadError).toHaveText('Image width must be lower than 1000px.');
    });
});
