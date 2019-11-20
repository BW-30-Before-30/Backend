const request = require('supertest');

const server = require('../api/server');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs')


describe('server', () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

it("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

// Login tests
describe('POST /api/login', () => {
  it('should return 401 status for wrong user', async () => {
    const res = await request(server).post('/api/login')
      .send({
        username: "someuser",
        password: "apass"
      })
      .set('Content-Type', 'application/json')
    expect(res.status).toBe(401)
    expect(res.body.message).toBe("Invalid Credentials")
  });

  it('should return 200 status', async () => {
    const password = bcrypt.hashSync("password", 16)
    await db('users').insert([
      { username: "akak", password:  password},
    ])
    const res = await request(server).post('/api/auth/login')
      .send({
        username: "akak",
        password: "password"
      })
      .set('Content-Type', 'application/json')
    expect(res.status).toBe(200)
  }, 10000)
});


// resigter test
describe('POST /api/register', () => {
  it('should return 201 status', async() => {
    return request(server).post('/api/auth/register')
      .send({
        username: "akak",
        password: "test"
      })
      .set('Content-Type', 'application/json')
      .then(res => {
        expect(res.status).toBe(201)
      })
  }, 10000)

  it('needs username and password', async () => {
    return request(server).post('/api/register')
      .send({
      })
      .set('Content-Type', 'application/json')
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing input");
      });
  }, 10000)
});



// bucketlists api test 
describe('GET /api/bucketlists', () => {
  it('Needs authorization', async() => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("no credentials provided")
  });


  it('should accept token', async () => {
    const password = bcrypt.hashSync("password", 16)
    await db('users').insert([
      { username: "akak", password:  password},
    ])
    const res = await request(server).post('/api/auth/login')
      .send({
        username: "akak",
        password: "password"
      })
      .set('Content-Type', 'application/json')
    const token = res.body.token
    console.log(token)

    return request(server)
      .get('/api/bucketlists')
      .set('Authorization', token)
      .then(res => {
        expect(res.status).toBe(200)
      })
  }, 20000)
});
});