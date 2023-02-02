const request = require('supertest');
const { config } = require('../config');
const registerData = require('../test.data/register.data');

describe('POST /User/register', () => {
  it('should return response for valid values', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      firstName: registerData.validFirstName,
      lastName: registerData.validLastName,
      email: registerData.validEmail,
      password: registerData.validPassword,
      address: registerData.validAddress,
      country: registerData.validState
    })
      expect(res.status).toEqual(200);
  })

  it('should return response for values that already exists', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      firstName: registerData.validFirstName,
      lastName: registerData.validLastName,
      email: registerData.validEmail,
      password: registerData.validPassword,
      address: registerData.validAddress,
      country: registerData.validState
    })
    expect(res.status).toEqual(409);
    expect(res.body).toEqual({
          "statusCode": 409,
          "message": "Email already exists.",
          "stackTrace": null
        });
      })

  it('should return response for request without body', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send()
    expect(res.status).toEqual(415);
  })

  it('should return response for request with invalid method', async () => {
    const res = await request(config.baseUrl).get('/User/register').trustLocalhost().send({
      firstName: registerData.validFirstName,
      lastName: registerData.validLastName,
      email: registerData.validEmail,
      password: registerData.validPassword,
      address: registerData.validAddress,
      country: registerData.validState
    })
    expect(res.status).toEqual(405);
  })

  it('should return response for request without firstName value', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      lastName: registerData.validLastName,
      email: registerData.validEmail,
      password: registerData.validPassword,
      address: registerData.validAddress,
      country: registerData.validState
    })
    expect(res.status).toEqual(400);
  })

  it('should return response for invalid firstName value', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      firstName: registerData.invalidFirstName,
      lastName: registerData.validLastName,
      email: registerData.validEmail,
      password: registerData.validPassword,
      address: registerData.validAddress,
      country: registerData.validState
    })
    expect(res.status).toEqual(400)
        expect(res.body).toEqual({
          "statusCode": 400,
          "message": "First name is invalid. (Parameter 'firstName')",
          "stackTrace": null
        });
      })

  it('should return response for invalid lastName values', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      firstName: registerData.validFirstName,
      lastName: registerData.invalidLastName,
      email: registerData.validEmail,
      password: registerData.validPassword,
      address: registerData.validAddress,
      country: registerData.validState
    })
    expect(res.status).toEqual(400)
        expect(res.body).toEqual({
          "statusCode": 400,
          "message": "Last name is invalid. (Parameter 'lastName')",
          "stackTrace": null
        });
  })

  it('should return response for invalid email values', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      firstName: registerData.validFirstName,
      lastName: registerData.validLastName,
      email: registerData.invalidEmail,
      password: registerData.validPassword,
      address: registerData.validAddress,
      country: registerData.validState
    })
      expect(res.status).toEqual(400)
        expect(res.body).toEqual({
          "statusCode": 400,
          "message": "Wrong email format.",
          "stackTrace": null
        });
  })

  it('should return response for invalid password values', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      firstName: registerData.validFirstName,
      lastName: registerData.validLastName,
      email: registerData.validEmail,
      password: registerData.invalidPassword,
      address: registerData.validAddress,
      country: registerData.validState
    })
      expect(res.status).toEqual(400)
      expect(res.body).toEqual({
          "statusCode": 400,
          "message": "Failed : PasswordTooShort,PasswordRequiresDigit,PasswordRequiresUpper",
          "stackTrace": null
        });
      })
  })

  it('should return response for invalid address values', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      firstName: registerData.validFirstName,
      lastName: registerData.validLastName,
      email: registerData.validEmail,
      password: registerData.validPassword,
      address: registerData.invalidAddress,
      country: registerData.validState
    })
      expect(res.status).toEqual(400)
        expect(res.body).toEqual({
          "statusCode": 400,
          "message": "Address is invalid. (Parameter 'address')",
          "stackTrace": null
        });
  })

  it('should return response for invalid country values', async () => {
    const res = await request(config.baseUrl).post('/User/register').trustLocalhost().send({
      firstName: registerData.validFirstName,
      lastName: registerData.validLastName,
      email: registerData.validEmail,
      password: registerData.validPassword,
      address: registerData.validAddress,
      country: registerData.invalidState
    })
      expect(res.status).toEqual(400)
      expect(res.body).toEqual({
          "statusCode": 400,
          "message": "Country name is invalid. (Parameter 'country')",
          "stackTrace": null
        });
});
