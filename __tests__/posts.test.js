const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // it('should login and redirect users to all posts', async () => {
  //   const res = await request
  //     .agent(app)
  //     .get('/api/v1/github/login/callback?code=42')
  //     .redirects(1);

  //   expect(res.status).toEqual(200);
  //   expect(res.body).toEqual([
  //     {
  //       id: '1',
  //       content: 'Nori is a cutie',
  //     },
  //   ]);
  // });

  it('user can create a post', async () => {
    const agent = request.agent(app);
    const expected = {
      id: expect.any(String),
      content: 'example',
    };
    let res = await agent.post('/api/v1/posts').send(expected);
    expect(res.status).toEqual(401);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    res = await agent.post('/api/v1/posts').send(expected);
    expect(res.body).toEqual(expected);
  });

  it('should get all posts if user is signed in', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const post1 = {
      id: expect.any(String),
      content: 'tokio is cute',
    };

    const post2 = {
      id: expect.any(String),
      content: 'tokio and nori are cuties',
    };
    const res = await agent.get('/api/v1/posts');

    expect(res.body).toEqual([post1, post2]);
  });
});
