const { spec, request } = require('pactum');

describe('Posts API - E2E (json-server + Pactum 3.8.0)', () => {

  let postId;

  it('POST → Create post', async () => {
    const res = await spec()
      .post('http://localhost:3000/posts')
      .withJson({
        title: 'Pactum Post',
        body: 'Created via E2E test',
        userId: 1
      })
      .expectStatus(201);

    postId = res.json.id;
  });

  it('GET → Fetch created post', async () => {
    await spec()
      .get(`http://localhost:3000/posts/${postId}`)
      .expectStatus(200)
      .expectJsonLike({
        title: 'Pactum Post'
      });
  });

  it('PUT → Update post', async () => {
    await spec()
      .put(`http://localhost:3000/posts/${postId}`)
      .withJson({
        id: postId,
        title: 'Updated Pactum Post',
        body: 'Updated via E2E',
        userId: 1
      })
      .expectStatus(200);
  });

  it('GET → Verify updated post', async () => {
    await spec()
      .get(`http://localhost:3000/posts/${postId}`)
      .expectStatus(200)
      .expectJsonLike({
        title: 'Updated Pactum Post'
      });
  });

  it('DELETE → Delete post', async () => {
    await spec()
      .delete(`http://localhost:3000/posts/${postId}`)
      .expectStatus(200);
  });

  it('GET → Verify post deleted', async () => {
    await spec()
      .get(`http://localhost:3000/posts/${postId}`)
      .expectStatus(404);
  });

});
