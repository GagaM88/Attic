const request = require('supertest');
const { config } = require('../config');
const loginData = require('../test.data/login.data');



describe('POST /User/login', () => {
  it('should return response for valid input values', async () => {
    const res = await request(config.baseUrl)
      .post('/User/login')
      .trustLocalhost()
      .send({
        email: loginData.email,
        password: loginData.password,
      })
    expect(res.status).toEqual(200)
  });

  it('should return response for invalid email value', async () => {
    const res = await request(config.baseUrl)
      .post('/User/login')
      .trustLocalhost()
      .send({
        email: loginData.invalidEmail,
        password: loginData.password,
      })
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({
      message: 'Failed',
      stackTrace: null,
      statusCode: 400,
    });
  });
});

it('should return response for invalid password value', async () => {
  const res = await request(config.baseUrl)
    .post('/User/login')
    .trustLocalhost()
    .send({
      email: loginData.email,
      password: loginData.invalidPassword,
    })
  expect(res.status).toEqual(400)
  expect(res.body).toEqual({
    message: 'Failed',
    stackTrace: null,
    statusCode: 400,
  });
});

it('should return response for non-existen value', async () => {
  const res = await request(config.baseUrl)
    .post('/User/login')
    .trustLocalhost()
    .send({
      email: loginData.nonExistenEmail,
      password: loginData.password,
    })
  expect(res.status).toEqual(400)
  expect(res.body).toEqual({
    message: 'Failed',
    stackTrace: null,
    statusCode: 400,
  });
});

it('should return response for empty values', async () => {
  const res = await request(config.baseUrl)
    .post('/User/login')
    .trustLocalhost()
    .send({
      email: '',
      password: '',
    })
  expect(res.status).toEqual(400)
  expect(res.body).toEqual({
    message: 'Failed',
    stackTrace: null,
    statusCode: 400,
  });
});

it('should return response for empty body', async () => {
  const res = await request(config.baseUrl)
    .post('/User/login')
    .trustLocalhost()
    .send()
  expect(res.status).toEqual(415)
});

it('should return response for invalid method', async () => {
  const res = await request(config.baseUrl)
    .get('/User/login')
    .trustLocalhost()
    .send({
      email: loginData.email,
      password: loginData.password,
    })
  expect(res.status).toEqual(405)
});

it('should return response without password parameter', async () => {
  const res = await request(config.baseUrl)
    .post('/User/login')
    .trustLocalhost()
    .send({
      email: loginData.email,
    })
  expect(res.status).toEqual(400)
});

it('should return response with added parameter', async () => {
  const res = await request(config.baseUrl)
    .post('/User/login')
    .trustLocalhost()
    .send({
      email: loginData.email,
      password: loginData.password,
      firstName: loginData.firstName,
    })
  expect(res.status).toEqual(200)
});
