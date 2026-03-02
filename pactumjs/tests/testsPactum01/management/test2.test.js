const { spec, request } = require('pactum');
const { loadTempl } = require('./loadTempl');

request.setBaseUrl('http://localhost:3000');

describe('POST using JSON data template', () => {

  before(() => {
    loadTempl(); // load template once
  });

  it('should create post using createPost template', async () => {
    await spec()
      .post('/posts')
      .withJson({ '@DATA:TEMPLATE@': 'createPost' })
      .expectStatus(201);
  });

});
