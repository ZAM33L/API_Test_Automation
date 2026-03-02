const { spec, request } = require('pactum');
request.setBaseUrl('http://localhost:3000');

describe('Local Posts API', () => {
  let postId;

  it('POST: create a post', async () => {
    const res = await spec()
      .post('/posts')
      .withJson({
        title: 'API Testing with Pactum',
        body: 'This is a sample post',
        userId: 1
      })
      .expectStatus(201);

    postId = res.json.id;
  });

  it('GET: fetch the post', async () => {
    await spec()
      .get(`/posts/${postId}`)
      .expectStatus(200)
      .expectJsonLike({
        title: 'API Testing with Pactum',
        body: 'This is a sample post'
      });
  });

  it('PUT: update the post', async () => {
    await spec()
      .put(`/posts/${postId}`)
      .withJson({
        id: postId,
        title: 'Updated Title',
        body: 'Updated Body',
        userId: 1
      })
      .expectStatus(200);
  });

  it('DELETE: delete the post', async () => {
    await spec()
      .delete(`/posts/${postId}`)
      .expectStatus(200);
  });
});
