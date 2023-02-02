const path = require('path');

const profilePictureData = {
  validPicture: path.join(__dirname, './profile.picture.data/validPicture.jpg'),
  invalidFileFormat: path.join(__dirname, './profile.picture.data/invalidFileFormat.pdf'),
  invalidPictureDimensions: path.join(__dirname, './profile.picture.data/invalidPictureDimensions.webp'),
};

module.exports = profilePictureData;