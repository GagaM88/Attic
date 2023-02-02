const path = require('path');

const fileManagementData = {
  validFile: path.join(__dirname, './file.management.data/validFile.pdf'),
  validFolderId: '8e094579-67d0-45b8-9e78-7bb8c59a0f10',
  invalidFolderId: '414ed6fe-f9a2',
  validFileId: '450600cc-005f-434d-b211-fdec88efc031',
  validNewName: 'file15',
  invalidFileId: 'ae86727a-29da',
  invalidNewName: '   file',
  validNewFolder: '8e094579-67d0-45b8-9e78-7bb8c59a0f10',
  invalidNewFolder: '7d5db784-5030',
};
module.exports = fileManagementData;