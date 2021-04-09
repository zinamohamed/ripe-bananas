const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
});
