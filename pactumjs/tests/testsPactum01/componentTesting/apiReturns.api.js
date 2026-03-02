const { spec } = require('pactum');

const BASE_URL = 'http://localhost:4000';

function createPost(payload) {
  return spec()
    .post(`${BASE_URL}/posts`)
    .withJson(payload);
}

module.exports = { createPost };
