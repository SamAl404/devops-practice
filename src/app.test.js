const request = require('supertest');
const app = require('./app');

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /items', () => {
  it('returns list of items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /items/:id', () => {
  it('returns item by id', async () => {
    const res = await request(app).get('/items/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('returns 404 for missing item', async () => {
    const res = await request(app).get('/items/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /items', () => {
  it('creates a new item', async () => {
    const res = await request(app).post('/items').send({ name: 'New Item' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('New Item');
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.statusCode).toBe(400);
  });
});
