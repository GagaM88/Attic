const request = require('supertest');
const { config } = require('../config');
const loginData = require('../test.data/login.data');
const fileManagementData = require('../test.data/file.management.data');

describe('POST /File', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).post('/File').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', fileManagementData.validFile).query({
      folderId: fileManagementData.validFolderId,
    })
    expect(res.status).toEqual(200);
  })

  it('should return response for uploading invalid folder Id', async () => {
    const res = await request(config.baseUrl).post('/File').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', fileManagementData.validFile).query({
      folderId: fileManagementData.invalidFolderId,
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for uploading file that already exists', async () => {
    const res = await request(config.baseUrl).post('/File').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', fileManagementData.validFile).query({
      folderId: fileManagementData.validFolderId,
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for uploading file without folder Id', async () => {
    const res = await request(config.baseUrl).post('/File').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', fileManagementData.validFile)
    expect(res.status).toEqual(400);
  })

  it('should return response for request when user is not logged', async () => {
    const res = await request(config.baseUrl).post('/File').trustLocalhost()
    .attach('file', fileManagementData.validFile).query({
      folderId: fileManagementData.validFolderId,
    })
    expect(res.status).toEqual(401);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).delete('/File').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', fileManagementData.validFile).query({
      folderId: fileManagementData.validFolderId,
    })
    expect(res.status).toEqual(405);
  })
})

describe('GET /File/{fileId}', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).get(`/File/${fileManagementData.validFileId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(200);
  })

  it('should return response for invalid fileId', async () => {
    const res = await request(config.baseUrl).get(`/File/${fileManagementData.invalidFileId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(400);
  })

  it('should return response for without fileId', async () => {
    const res = await request(config.baseUrl).get('/File').trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(405);
  })

  it('should return response for request when user is not logged', async () => {
    const res = await request(config.baseUrl).get(`/File/${fileManagementData.validFileId}`).trustLocalhost()
    expect(res.status).toEqual(401);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).put(`/File/${fileManagementData.validFileId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(405);
  })
})

describe('PATCH /File/Rename', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).patch('/File/Rename').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      id: fileManagementData.validFileId,
      newName: fileManagementData.validNewName
    })
    expect(res.status).toEqual(200);
  })

it('should return response for rename file with invalid id', async () => {
  const res = await request(config.baseUrl).patch('/File/Rename').trustLocalhost()
  .set('cookie', loginData.cookie).send({
    id: fileManagementData.invalidId,
    newName: fileManagementData.validNewName
  })
  expect(res.status).toEqual(404);
})

it('should return response for rename file with same name', async () => {
  const res = await request(config.baseUrl).patch('/File/Rename').trustLocalhost()
  .set('cookie', loginData.cookie).send({
    id: fileManagementData.validFileId,
    newName: fileManagementData.validNewName
  })
  expect(res.status).toEqual(400);
})

it('should return response for rename file with invalid name', async () => {
  const res = await request(config.baseUrl).patch('/File/Rename').trustLocalhost()
  .set('cookie', loginData.cookie).send({
    id: fileManagementData.validFileId,
    newName: fileManagementData.invalidNewName
  })
  expect(res.status).toEqual(400);
})

it('should return response for rename file with empty name', async () => {
  const res = await request(config.baseUrl).patch('/File/Rename').trustLocalhost()
  .set('cookie', loginData.cookie).send({
    id: fileManagementData.validFileId,
    newName: ""
  })
  expect(res.status).toEqual(400);
})

it('should return response when user is not logged in', async () => {
  const res = await request(config.baseUrl).patch('/File/Rename').trustLocalhost()
  .send({
    id: fileManagementData.validId,
    newName: fileManagementData.validNewName
  })
  expect(res.status).toEqual(401);
})

it('should return response for request with invalid method', async () => {
  const res = await request(config.baseUrl).post('/File/Rename').trustLocalhost()
  .set('cookie', loginData.cookie).send({
    id: fileManagementData.validId,
    newName: fileManagementData.validNewName
  })
  expect(res.status).toEqual(405);
})
})

describe('PATCH /File/Move', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).patch('/File/Move').trustLocalhost()
    .set('cookie', loginData.cookie).query({
      fileId: fileManagementData.validFileId,
      newFolder: fileManagementData.validNewFolder
    })
    expect(res.status).toEqual(200);
  })

it('should return response for moving file with invalid id', async () => {
  const res = await request(config.baseUrl).patch('/File/Move').trustLocalhost()
  .set('cookie', loginData.cookie).query({
    fileId: fileManagementData.invalidFileId,
    newFolder: fileManagementData.validNewFolder
  })
  expect(res.status).toEqual(400);
})

it('should return response for fileId value empty', async () => {
  const res = await request(config.baseUrl).patch('/File/Move').trustLocalhost()
  .set('cookie', loginData.cookie).query({
    newFolder: fileManagementData.validNewFolder
  })
  expect(res.status).toEqual(404);
})

it('should return response for invalid newFolder value', async () => {
  const res = await request(config.baseUrl).patch('/File/Move').trustLocalhost()
  .set('cookie', loginData.cookie).query({
    fileId: fileManagementData.validId,
    newFolder: fileManagementData.invalidNewFolder
  })
  expect(res.status).toEqual(400);
})

it('should return response for newFolder value empty', async () => {
  const res = await request(config.baseUrl).patch('/File/Move').trustLocalhost()
  .set('cookie', loginData.cookie).query({
    fileId: fileManagementData.validId
  })
  expect(res.status).toEqual(404);
})

it('should return response for moving file in same folder', async () => {
  const res = await request(config.baseUrl).patch('/File/Move').trustLocalhost()
  .set('cookie', loginData.cookie).query({
    fileId: fileManagementData.validFileId,
    newFolder: fileManagementData.validNewFolder
  })
  expect(res.status).toEqual(400);
})

it('should return response when user is not logged in', async () => {
  const res = await request(config.baseUrl).patch('/File/Move').trustLocalhost()
  .query({
    fileId: fileManagementData.validId,
    newFolder: fileManagementData.validNewFolder
  })
  expect(res.status).toEqual(401);
})

it('should return response for request with invalid method', async () => {
  const res = await request(config.baseUrl).post('/File/Move').trustLocalhost()
  .set('cookie', loginData.cookie).query({
    fileId: fileManagementData.validId,
    newFolder: fileManagementData.validNewName
  })
  expect(res.status).toEqual(405);
})
})

describe('DELETE /File/{fileId}', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).delete(`/File/${fileManagementData.validFileId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(200);
  })

  it('should return response for invalid fileId', async () => {
    const res = await request(config.baseUrl).delete(`/File/${fileManagementData.invalidFileId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(400);
  })

  it('should return response for without fileId', async () => {
    const res = await request(config.baseUrl).delete('/File').trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(405);
  })

  it('should return response for request when user is not logged', async () => {
    const res = await request(config.baseUrl).delete(`/File/${fileManagementData.validFileId}`).trustLocalhost()
    .attach('file', fileManagementData.validFile).query({
      folderId: fileManagementData.validFolderId,
    })
    expect(res.status).toEqual(401);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).put(`/File/${fileManagementData.validFileId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', fileManagementData.validFile).query({
      folderId: fileManagementData.validFolderId,
    })
    expect(res.status).toEqual(405);
  })
})
