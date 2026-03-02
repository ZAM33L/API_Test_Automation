const { spec, request, matchers } = require('pactum');
const { like, eachLike } = require('pactum-matchers');

request.setBaseUrl('http://localhost:3000');

describe('data matching', () => {

    it('validate single post using data matching(like)', async () => {
        const postPayload = {
            title: 'My Test Post',
            body: 'This is a dynamic post body'
        };

        await spec()
            .post('/posts')
            .withJson(postPayload)
            .expectStatus(201)
            .stores('postId', 'id')

        await spec()
            .get('/posts/$S{postId}')
            .expectStatus(200)
            .expectJsonMatch({
                id: like('$S{postId}'),
                title: like(postPayload.title),
                body: like(postPayload.body)
            })
    })
    it('validate multiple posts using eachLike', async () => {
        const post1 = {
            title: 'First Post',
            body: 'Body of the first post'
        };

        const post2 = {
            title: 'Second Post',
            body: 'Body of the second post'
        };

        // Create first post and store its id
        await spec()
            .post('/posts')
            .withJson(post1)
            .expectStatus(201)
            .stores('postId1', 'id');

        // Create second post and store its id
        await spec()
            .post('/posts')
            .withJson(post2)
            .expectStatus(201)
            .stores('postId2', 'id');

        // Validate first post using stored id
        await spec()
            .get('/posts/$S{postId1}')
            .expectStatus(200)
            .expectJsonMatch({
                id: like('$S{postId1}'),
                title: like(post1.title),
                body: like(post1.body)
            });

        // Validate second post using stored id
        await spec()
            .get('/posts/$S{postId2}')
            .expectStatus(200)
            .expectJsonMatch({
                id: like('$S{postId2}'),
                title: like(post2.title),
                body: like(post2.body)
            });

        //validate all posts
        await spec()
        .get('/posts')
        .expectStatus(200)
        .expectJsonMatch(eachLike({
            id:like('some id'),
            title:like('some title'),
            body:like('some body')
        }))
    })

})