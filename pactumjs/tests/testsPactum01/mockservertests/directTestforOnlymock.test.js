const { spec, mock } = require('pactum');
const postMocks = require("../testsPactum01/onlymock.mock")

describe("mock using helper", () => {
    let postId;

    before(() => {
        postMocks.startMockServer()
    })
    after(() => {
        postMocks.stopMockServer()
    })

    it('POST ops', async () => {
        postMocks.mockCreatePost();
        const res = await spec()
            .post('http://localhost:4000/posts')
            .withJson({ title: 'Mock Post', body: 'This is mocked content' })
            .expectStatus(201);

        postId = res.body.id;
    })

    it('GET /posts (after POST)', async () => {
        postMocks.mockGetPosts(postId);
        await spec()
            .get('http://localhost:4000/posts')
            .expectStatus(200)
            .expectJsonLength(1);
    });

    it('PUT /posts/:id', async () => {
        postMocks.mockUpdatePost(postId);
        await spec()
            .put(`http://localhost:4000/posts/${postId}`)
            .withJson({ title: 'Updated Mock Post', body: 'Updated content' })
            .expectStatus(200);
    });

    it('GET /posts (after PUT)', async () => {
        postMocks.mockGetUpdatedPost(postId);
        await spec()
            .get('http://localhost:4000/posts')
            .expectStatus(200);
    });

    it('DELETE /posts/:id', async () => {
        postMocks.mockDeletePost(postId);
        await spec()
            .delete(`http://localhost:4000/posts/${postId}`)
            .expectStatus(200);
    });

    it('Confirm Deletion', async () => {
        postMocks.mockConfirmDeletionPost(postId);
        await spec()
            .get(`http://localhost:4000/posts/${postId}`)
            .expectStatus(404);
    });
})