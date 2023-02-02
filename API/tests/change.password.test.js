const request = require('supertest');
const { config } = require('../config');
const loginData = require('../test.data/login.data');
const changePasswordData = require('../test.data/change.password.data');

describe('POST /User/Picture', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).post('/User/changePassword').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      currentPassword: changePasswordData.validCurrentPassword,
      newPassword: changePasswordData.validNewPassword
    })
    expect(res.status).toEqual(200);
  })

  it('should return response for request with invalid "newPassword" value', async () => {
    const res = await request(config.baseUrl).post('/User/changePassword').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      currentPassword: changePasswordData.validNewPassword,
      newPassword: changePasswordData.invalidNewPassword
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request without body', async () => {
    const res = await request(config.baseUrl).post('/User/changePassword').trustLocalhost()
    .set('cookie', loginData.cookie).send()
    expect(res.status).toEqual(415);
  })

  it('should return response for request with with "currentPassword" empty value', async () => {
    const res = await request(config.baseUrl).post('/User/changePassword').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      currentPassword:'',
      newPassword: changePasswordData.validNewPassword
    })
    expect(res.status).toEqual(409);
  })

  it('should return response for request with with "newPassword" empty value', async () => {
    const res = await request(config.baseUrl).post('/User/changePassword').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      currentPassword: changePasswordData.validNewPassword,
      newPassword: ''
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).get('/User/changePassword').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      currentPassword: changePasswordData.validNewPassword,
      newPassword: changePasswordData.validNewPassword
    })
    expect(res.status).toEqual(405);
  })

  it('should return response for request if current and new password are the same', async () => {
    const res = await request(config.baseUrl).post('/User/changePassword').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      currentPassword: changePasswordData.validNewPassword,
      newPassword: changePasswordData.validNewPassword
    })
    expect(res.status).toEqual(200);
  })

  it('should return response with empty values', async () => {
    const res = await request(config.baseUrl).post('/User/changePassword').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      currentPassword: '',
      newPassword: ''
    })
    expect(res.status).toEqual(409);
  })
})