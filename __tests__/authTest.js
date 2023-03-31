const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const app = require('../app');
const User = require('../models/user');

const {DB_HOST, PORT} = process.env;

describe('Test the login controller', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());
  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test(// eslint-disable-next-line max-len
      'should respond with a token and user object with email and subscription fields', async () => {
        const newUser = {
          email: 'testuser@example.com',
          password: 'password123',
          subscription: 'premium',
        };
        await User.create(newUser);

        const response = await request(app)
            .post('/api/auth/login')
            .send({
              email: newUser.email,
              password: newUser.password,
            })
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
              token: expect.any(String),
              user: expect.objectContaining({
                email: newUser.email,
                subscription: newUser.subscription,
              }),
            }),
        );
      });

  test('should respond with 401 if email is incorrect', async () => {
    const newUser = {
      email: 'testuser@example.com',
      password: 'password123',
    };
    await User.create(newUser);

    const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrongemail@example.com',
          password: newUser.password,
        })
        .expect(401);

    expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Invalid credentials',
        }),
    );
  });

  test('should respond with 401 if password is incorrect', async () => {
    const newUser = {
      email: 'testuser@example.com',
      password: 'password123',
    };
    await User.create(newUser);

    const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: newUser.email,
          password: 'wrongpassword',
        })
        .expect(401);

    expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Invalid credentials',
        }),
    );
  });
});
