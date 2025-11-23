import request from 'supertest';
import app from '../src/server.js';

describe('Products API', () => {
  describe('GET /api/products', () => {
    it('should return a list of products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    // Add more tests here
    // Example: test category filter, search, update, etc.
  });
});

