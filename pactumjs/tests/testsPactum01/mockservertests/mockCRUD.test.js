const { spec, mock } = require('pactum');

describe('Mock Server', () => {

    let postId;

    before(() => {
        mock.start(4000);
    });

    after(() => {
        mock.stop();
    });

    it('POST /posts', async () => {
        mock.addInteraction({
            request: {
                method: 'POST',
                path: '/posts',
                body: {
                    title: 'Mock Post',
                    body: 'This is mocked content'
                }
            },
            response: {
                status: 201,
                body: {
                    id: 101,
                    title: 'Mock Post',
                    body: 'This is mocked content'
                }
            }
        });

        const res = await spec()
            .post('http://localhost:4000/posts')
            .withJson({
                title: 'Mock Post',
                body: 'This is mocked content'
            })
            .expectStatus(201);

        postId = res.body.id;
    });

    it('GET /post', async () => {
        mock.addInteraction({
            request: {
                method: 'GET',
                path: '/posts'
            },
            response: {
                status: 200,
                body: [
                    {
                        id: postId,
                        title: 'Mock Post',
                        body: 'This is mocked content'
                    }
                ]
            }
        });
        await spec()
            .get('http://localhost:4000/posts')
            .expectStatus(200)
            .expectJsonLength(1);
    })

    it('put /posts/:id', async () => {
        mock.addInteraction({
            request: {
                method: 'PUT',
                path: `/posts/${postId}`,
                body: {
                    title: 'Updated Mock Post',
                    body: 'Updated content'
                }
            },
            response: {
                status: 200,
                body: {
                    id: postId,
                    title: 'Updated Mock Post',
                    body: 'Updated content'
                }
            }
        })
        await spec()
            .put(`http://localhost:4000/posts/${postId}`)
            .withJson({
                title: 'Updated Mock Post',
                body: 'Updated content'
            })
            .expectStatus(200);
    })
    it('GET /posts (after PUT)', async () => {
        mock.addInteraction({
            request: {
                method: 'GET',
                path: '/posts'
            },
            response: {
                status: 200,
                body: [
                    {
                        id: postId,
                        title: 'Updated Mock Post',
                        body: 'Updated content'
                    }
                ]
            }
        });

        await spec()
            .get('http://localhost:4000/posts')
            .expectStatus(200)
            .expectJsonLike([{ title: 'Updated Mock Post' }]);
    });
    it('DELETE /posts/:id', async () => {
        mock.addInteraction({
            request: {
                method: 'DELETE',
                path: `/posts/${postId}`
            },
            response: {
                status: 200
            }
        });

        await spec()
            .delete(`http://localhost:4000/posts/${postId}`)
            .expectStatus(200);
    });

    it('confirm deletion', async () => {
        mock.addInteraction({
            request: {
                method: 'GET',
                path: `/posts/${postId}`
            },
            response: {
                status: 404,
                body: {
                    message: 'Post not found'
                }
            }
        });
        await spec()
            .get(`http://localhost:4000/posts/${postId}`)
            .expectStatus(404);

        // mock.addInteraction({
        //     request: {
        //         method: 'GET',
        //         path: '/posts'
        //     },
        //     response: {
        //         status: 200,
        //         body: []
        //     }
        // });
        // await spec()
        //     .get('http://localhost:4000/posts')
        //     .expectJsonLength(0);
    })
});

