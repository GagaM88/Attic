const page = require('./page');

class SuccessfullyRegisterPage extends page {
  get messageSuccessfullyRegister() {
    return $('.sc-kgflAQ');
  }

  open() {
    return super.open('successfull_registration');
  }
}

module.exports = new SuccessfullyRegisterPage();
