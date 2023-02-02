const request = require('supertest');
const { config } = require('../config');
const loginData = require('../test.data/login.data');
const profilePictureData = require('../test.data/profile.picture.data');
let pictureId;

describe('POST /User/Picture', () => {
  it('should return response for uploading valid format of image', async () => {
    const res = await request(config.baseUrl).post('/User/Picture').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', profilePictureData.validPicture)
      expect(res.status).toEqual(200);
      pictureId = res.body;
  })

  it('should return response for uploading invalid format of image', async () => {
    const res = await request(config.baseUrl).post('/User/Picture').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', profilePictureData.invalidFileFormat)
      expect(res.status).toEqual(400);
  })

  it('should return response for invalid dimensions of image', async () => {
    const res = await request(config.baseUrl).post('/User/Picture').trustLocalhost()
     .set('cookie', loginData.cookie)
    .attach('file', profilePictureData.invalidPictureFormat)
      expect(res.status).toEqual(400);
  })

  it('should return response for request without a image', async () => {
    const res = await request(config.baseUrl).post('/User/Picture').trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(400);
  })

  it('should return response for request with invalid method get', async () => {
    const res = await request(config.baseUrl).get('/User/Picture').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', profilePictureData.validPicture)
      expect(res.status).toEqual(405);
  })
})

 describe('GET /User/Picture/{pictureId}', () => {
 it('should return response for valid image Id', async () => {
    const res = await request(config.baseUrl).get(`/User/Picture/${pictureId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(200);
  })

  it('should return response for invalid image Id', async () => {
    const res = await request(config.baseUrl).get('/User/Picture/;,lomkolijoi').trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(400);
  })

  it('should return response when user does not have picture', async () => {
    const res = await request(config.baseUrl).post('/User/Picture').trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(400);
      await request(config.baseUrl).get(`/User/Picture/${pictureId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(400);
  })
  
  it('should return response for request with invalid method post', async () => {
    const res = await request(config.baseUrl).post(`/User/Picture/${pictureId}`).trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(405);
  })
})

describe('DELETE /User/Picture', () => {
  it('should return response with valid method and image id', async () => {
    const res = await request(config.baseUrl).post('/User/Picture').trustLocalhost()
    .set('cookie', loginData.cookie)
    .attach('file', profilePictureData.validPicture)
      expect(res.status).toEqual(200);
    await request(config.baseUrl).delete('/User/Picture').trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(200);
  })

  it('should return response when user does not have picture', async () => {
    const res = await request(config.baseUrl).delete('/User/Picture').trustLocalhost()
    .set('cookie', loginData.cookie)
      expect(res.status).toEqual(404);
  })

  it('should return response when user is not logged in', async () => {
    const res = await request(config.baseUrl).delete('/User/Picture').trustLocalhost()
      expect(res.status).toEqual(401);
  })
})
