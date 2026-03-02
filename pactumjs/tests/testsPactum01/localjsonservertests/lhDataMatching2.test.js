const { spec, request } = require('pactum');
const { like, eachLike } = require('pactum-matchers'); // works with latest Pactum

request.setBaseUrl('http://localhost:3000');

const post1 = { title: 'First Post', body: 'Body of first post' };
const post2 = { title: 'Second Post', body: 'Body of second post' };

it('POST ops', async () => {


    // Create first post and store id
    await spec()
        .post('/posts')
        .withJson(post1)
        .expectStatus(201)
        .stores('postId1', 'id');

    // Create second post and store id
    await spec()
        .post('/posts')
        .withJson(post2)
        .expectStatus(201)
        .stores('postId2', 'id');
})

it('validate each seperately using data matching', async () => {
    await spec()
        .get('/posts/$S{postId1}')
        .expectStatus(200)
        .expectJsonMatch({
            id: like('$S{postId1}'),
            title: like(post1.title),
            body: like(post1.body)
        });

    await spec()
        .get('/posts/$S{postId2}')
        .expectStatus(200)
        .expectJsonMatch({
            id: like('$S{postId2}'),
            title: like(post2.title),
            body: like(post2.body)
        });

})

it('validate everything using eachLike',async()=>{
    await spec()
    .get('/posts')
    .expectStatus(200)
    .expectJsonMatch(eachLike({
        id:like('some id'),
        title:like('some title'),
        body:like('some body')
    }))
})