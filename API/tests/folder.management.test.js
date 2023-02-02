const request = require('supertest');
const { config } = require('../config');
const loginData = require('../test.data/login.data');
const folderManagementData = require('../test.data/folder.management.data');

describe('POST /Folder', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).post('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      name: folderManagementData.validName,
      parentId: folderManagementData.validParentId
    })
    expect(res.status).toEqual(200);
  })

  it('should return response for creating folder with "name" empty value', async () => {
    const res = await request(config.baseUrl).post('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      name: "",
      parentId: folderManagementData.validParentId
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for creating folder with "name" invalid value', async () => {
    const res = await request(config.baseUrl).post('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      name: folderManagementData.invalidName,
      parentId: folderManagementData.validParentId
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for create folder with name that already exists', async () => {
    const res = await request(config.baseUrl).post('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      name: folderManagementData.validName,
      parentId: folderManagementData.validParentId
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request without body', async () => {
    const res = await request(config.baseUrl).post('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(415);
  })

  it('should return response when user is not logged in', async () => {
    const res = await request(config.baseUrl).post('/Folder').trustLocalhost()
    .send({
      name: folderManagementData.validName,
      parentId: folderManagementData.validParentId
    })
    expect(res.status).toEqual(401);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).delete('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      name: folderManagementData.validName,
      parentId: folderManagementData.validParentId
    })
    expect(res.status).toEqual(405);
  })
})

describe('GET /Folder', () => {
  it('should return response for request to get all folders with all valid parameters', async () => {
    const res = await request(config.baseUrl).get('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).query({
      sortType: 1,
      sortDirection: 1,
      pageSize: 5,
      pageNumber: 1
    })
    expect(res.status).toEqual(200);
  })

  it('should return response for request with invalid "sortType" parameter', async () => {
    const res = await request(config.baseUrl).get('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).query({
      sortType: 77,
      sortDirection: 1,
      pageSize: 5,
      pageNumber: 1
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request with invalid "sortDirection" parameter', async () => {
    const res = await request(config.baseUrl).get('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).query({
      sortType: 1,
      sortDirection: 77,
      pageSize: 5,
      pageNumber: 1
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request with invalid "pageSize" parameter', async () => {
    const res = await request(config.baseUrl).get('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).query({
      sortType: 1,
      sortDirection: 1,
      pageSize: 7,
      pageNumber: 1
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request with invalid "pageNumber" parameter', async () => {
    const res = await request(config.baseUrl).get('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).query({
      sortType: 1,
      sortDirection: 1,
      pageSize: 7,
      pageNumber: 'aaa'
    })
    expect(res.status).toEqual(400);
  })

  it('should return response when user is not logged in', async () => {
    const res = await request(config.baseUrl).get('/Folder').trustLocalhost()
    .query({
      sortType: 1,
      sortDirection: 1,
      pageSize: 5,
      pageNumber: 1
    })
    expect(res.status).toEqual(401);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).delete('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).query({
      sortType: 1,
      sortDirection: 1,
      pageSize: 5,
      pageNumber: 1
    })
    expect(res.status).toEqual(405);
  })
})

describe('PATCH /Folder/Rename', () => {
  it('should return response for rename folder with valid id', async () => {
    const res = await request(config.baseUrl).patch('/Folder/Rename').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      id: folderManagementData.validId,
      newName: folderManagementData.validNewName
    })
    expect(res.status).toEqual(200);
  })

  it('should return response for rename folder with invalid id', async () => {
    const res = await request(config.baseUrl).patch('/Folder/Rename').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      id: folderManagementData.invalidId,
      newName: folderManagementData.validNewName
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for rename folder with same name', async () => {
    const res = await request(config.baseUrl).patch('/Folder/Rename').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      id: folderManagementData.validId,
      newName: folderManagementData.validNewName
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for rename folder with invalid name', async () => {
    const res = await request(config.baseUrl).patch('/Folder/Rename').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      id: folderManagementData.validId,
      newName: folderManagementData.invalidName
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for rename folder with empty name', async () => {
    const res = await request(config.baseUrl).patch('/Folder/Rename').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      id: folderManagementData.validId,
      newName: ""
    })
    expect(res.status).toEqual(400);
  })

  it('should return response when user is not logged in', async () => {
    const res = await request(config.baseUrl).patch('/Folder/Rename').trustLocalhost()
    .send({
      id: folderManagementData.validId,
      newName: folderManagementData.validNewName
    })
    expect(res.status).toEqual(401);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).delete('/Folder').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      id: folderManagementData.validId,
      newName: folderManagementData.validNewName
    })
    expect(res.status).toEqual(405);
  })
})

describe('DELETE /Folder/{folderId}', () => {
  it('should return response with valid method and folder id', async () => {
    const res = await request(config.baseUrl).delete(`/Folder/${folderManagementData.validId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(200);
  })

  it('should return response when folder is deleted', async () => {
    const res = await request(config.baseUrl).delete(`/Folder/${folderManagementData.validId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(400);
  })

  it('should return response when user is not logged in', async () => {
    const res = await request(config.baseUrl).delete(`/Folder/${folderManagementData.validId}`).trustLocalhost()
      expect(res.status).toEqual(401);
  })
})