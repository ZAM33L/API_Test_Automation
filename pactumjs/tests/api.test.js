const { spec } = require('pactum');

describe('JSONPlaceholder API Test', () => {

  it('should get posts', async () => {
    await spec()
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .expectStatus(200)
      .expectJsonLike({
        id: 1
      });
  });

});