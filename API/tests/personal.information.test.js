const request = require('supertest');
const { config } = require('../config');
const loginData = require('../test.data/login.data');
const personalInformationData = require('../test.data/personal.information.data');

describe('POST /User/updateUserPersonalInformation', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).post('/User/updateUserPersonalInformation').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      firstName: personalInformationData.validFirstName,
      lastName: personalInformationData.validLastName,
      address: personalInformationData.validAddress,
      country: personalInformationData.validCountry
    })
    expect(res.status).toEqual(200);
  })

  it('should return response for current values', async () => {
    const res = await request(config.baseUrl).post('/User/updateUserPersonalInformation').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      firstName: personalInformationData.validFirstName,
      lastName: personalInformationData.validLastName,
      address: personalInformationData.validAddress,
      country: personalInformationData.validCountry
    })
    expect(res.status).toEqual(200);
  })

  it('should return response for request without body', async () => {
    const res = await request(config.baseUrl).post('/User/updateUserPersonalInformation').trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(415);
  })

  it('should return response for request with invalid "firstName" value', async () => {
    const res = await request(config.baseUrl).post('/User/updateUserPersonalInformation').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      firstName: personalInformationData.invalidFirstName,
      lastName: personalInformationData.validLastName,
      address: personalInformationData.validAddress,
      country: personalInformationData.validCountry
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request with invalid "lastName" value', async () => {
    const res = await request(config.baseUrl).post('/User/updateUserPersonalInformation').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      firstName: personalInformationData.validFirstName,
      lastName: personalInformationData.invalidLastName,
      address: personalInformationData.validAddress,
      country: personalInformationData.validCountry
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request with invalid "address" value', async () => {
    const res = await request(config.baseUrl).post('/User/updateUserPersonalInformation').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      firstName: personalInformationData.validFirstName,
      lastName: personalInformationData.validLastName,
      address: personalInformationData.invalidAddress,
      country: personalInformationData.validCountry
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for request with invalid "country" value', async () => {
    const res = await request(config.baseUrl).post('/User/updateUserPersonalInformation').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      firstName: personalInformationData.validFirstName,
      lastName: personalInformationData.validLastName,
      address: personalInformationData.validAddress,
      country: personalInformationData.invalidCountry
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for invalid method', async () => {
    const res = await request(config.baseUrl).delete('/User/updateUserPersonalInformation').trustLocalhost()
    .set('cookie', loginData.cookie).send({
      firstName: personalInformationData.validFirstName,
      lastName: personalInformationData.validLastName,
      address: personalInformationData.validAddress,
      country: personalInformationData.validCountry
    })
    expect(res.status).toEqual(405);
  })
})

describe('GET /User/getUser', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).get('/User/getUser').trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(200);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).post('/User/getUser').trustLocalhost()
    .set('cookie', loginData.cookie)
    expect(res.status).toEqual(405);
  })
})