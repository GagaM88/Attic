const Page = require('../pageobjects/page');
const profilePicturePage = require('../pageobjects/profile.picture.page')


class Helper extends Page {
  waitForTextChange = (el, text, timeout) => {
    browser.waitUntil(
      () => el.getText() === text,
      { timeout },
    );
  };

  waitAndClick = (el, timeout) => {
    el.waitForDisplayed({ timeout });
    el.click();
  };

   uploadPicture = async(picture) => {
    const remoteFilePath = await browser.uploadFile(picture);

    await profilePicturePage.inputFile.addValue(remoteFilePath);
    await browser.execute(function () {
        document.querySelector('input[type="file"]').style.display = 'block';
    });
    await profilePicturePage.inputFile.setValue(remoteFilePath);
}

    }

module.exports = new Helper();
