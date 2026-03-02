const postMocks = require("../mockservertests/onlymock.mock")
const postApis = require("../mockservertests/onlyapi.api")

describe("calls using api and mock ", () => {
    let postId;

    before(() => postMocks.startMockServer());
    after(() => postMocks.stopMockServer());

    it('POST ops', async () => {
        postMocks.mockCreatePost();
        const res = await postApis.createPost({ title: 'Mock Post', body: 'This is mocked content' })
            .expectStatus(201);
        postId = res.body.id
        console.log(postId)
    })

    it('GET ops', async () => {
        postMocks.mockGetPosts(postId);
        await postApis.getPosts()
            .expectStatus(200)
    })

    it('PUT /posts/:id', async () => {
        postMocks.mockUpdatePost(postId);
        await postApis.updatePost(postId, { title: 'Updated Mock Post', body: 'Updated content' })
            .expectStatus(200);
    });

    it('GET /posts after update', async () => {
        postMocks.mockGetUpdatedPost(postId);
        await postApis.getUpdatedPost().expectStatus(200);
    });

    it('DELETE /posts/:id', async () => {
        postMocks.mockDeletePost(postId);
        await postApis.deletePost(postId).expectStatus(200);
    });

    it('Confirm deletion', async () => {
        postMocks.mockConfirmDeletionPost(postId);
        await postApis.confirmDeletedPost(postId).expectStatus(404);
    });
})