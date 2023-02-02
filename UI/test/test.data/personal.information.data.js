const personalInformationData = {
  newFirstName: 'Draganaaaa',
  newLastName: 'Stanisic',
  newState: 'Serbia',
  newAddress: 'Milutina Milankovica 9',
  invalidNewFirstName: 'Marija123',
  invalidNewLastName: 'Stanisic123',
  invalidNewState: 'Serbia123',
  invalidNewAddress: 'Milutina Milankovica #',
  messageErrorNewFirstName: '*Invalid first name. First name must contain only letters',
  messageErrorNewLastName:'*Invalid last name. Last name must contain only letters',
  messageErrorNewState: '*Invalid state. State must contain only letters',
  messageErrorNewAddress: '*Invalid address. Address must contain only letters and numbers',
  messageErrorRequiredField: '*This field is required',
  messageErrorData: 'You must change some data before saving',
};
module.exports = personalInformationData;
