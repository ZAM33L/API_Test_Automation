const { spec, request } = require('pactum');

request.setBaseUrl('http://localhost:3000');

describe("LocalHost Integration", () => {
    let postId;

    it("create post", async () => {
        const res = await spec()
            .post('/posts')
            .withJson({
                title: 'Integration Test Post',
                body: 'This is a post created during integration testing',
                userId: 1
            })
            .expectStatus(201)
            .expectJsonLike({
                title: 'Integration Test Post',
                body: 'This is a post created during integration testing',
                userId: 1
            })

        postId = res.json.id
        console.log(postId)
    })
    
    it('should fetch the created post', async () => {
        await spec()
            .get(`/posts/${postId}`)
            .expectStatus(200)
            .expectJsonLike({
                title: 'Integration Test Post',
                body: 'This is a post created during integration testing',
                userId: 1
            });
    });

    it('should update the post', async () => {
        await spec()
            .put(`/posts/${postId}`)
            .withJson({
                id: postId,
                title: 'Updated Test Post',
                body: 'This post has been updated',
                userId: 1
            })
            .expectStatus(200)
            .expectJsonLike({
                title: 'Updated Test Post',
                body: 'This post has been updated',
                userId: 1
            });
    });

    it('should fetch the updated post', async () => {
        await spec()
            .get(`/posts/${postId}`)
            .expectStatus(200)
            .expectJsonLike({
                title: 'Updated Test Post',
                body: 'This post has been updated',
                userId: 1
            });
    });

    it('should delete the post', async () => {
        await spec()
            .delete(`/posts/${postId}`)
            .expectStatus(200);
    });

    it('should return 404 for deleted post', async () => {
        await spec()
            .get(`/posts/${postId}`)
            .expectStatus(404);
    });
})