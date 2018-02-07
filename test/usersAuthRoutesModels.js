const supertest = require('supertest');

const db = require('../api/server/db');
const app = require('../api/server');
const agent = supertest.agent(app);

describe('User authentication, models, and routes', () => {
  beforeEach(() => {
    return db.sync({})
      .then(() => {
        console.log('synced the db');
      });
  });

  describe('Signup', () => {
    it('responds with 200 when successfully creating a valid new Admin user', () => {
      return agent
        .post('/auth/signup')
        .send({
          email: 'test@test.com',
          password: 'test',
          isAdmin: true
        })
        .expect(200);
    });
    it('responds with 401 if a user already exists', () => {
      return agent
        .post('/auth/signup')
        .send({
          email: 'test@test.com',
          password: 'test'
        })
        .expect(401);
    });
    it('responds with 202 if delete a valid gatekeeperMiddleware user', () => {
      return agent
        .delete('/api/users/5')
        .expect(202);
    });
  });

  describe('Login', () => {
    it('responds with 200 if successful', () => {
      return agent
        .put('/auth/login')
        .send({
          email: 'kevin@kevin.com',
          password: 'kevin'
        })
        .expect(200);
    });
    it('responds with 401 if incorrect password', () => {
      return agent
        .put('/auth/login')
        .send({
          email: 'kevin@kevin.com',
          password: 'incorrectPassword'
        })
        .expect(401);
    });
  });
});

