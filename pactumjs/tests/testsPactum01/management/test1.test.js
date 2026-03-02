const { spec, stash, request, handler } = require('pactum');

request.setBaseUrl('http://localhost:3000');

stash.addDataTemplate({
    PostTemplate1: {
        title: 'template title 1',
        body: 'updated body 1'
    }
})
stash.addDataTemplate({
    PostTemplate2: {
        title: 'template title 2',
        body: 'updated body 2'
    }
})

handler.addDataFuncHandler('uniqueTitle', () => {
    return `Post ${Date.now()}`
})

stash.addDataMap({
    postTypes: {
        normal: 'Normal Post',
        important: 'IMPORTANT POST'
    }
})

it('POST ops with data template', async () => {
    await spec()
        .post('/posts')
        .withJson({ '@DATA:TEMPLATE@': 'PostTemplate1' })
        .expectStatus(201)
})

it('POST ops with data function', async () => {
    await spec()
        .post('/posts')
        .withJson({
            title: `$F{uniqueTitle}`,
            body: 'Dynamic body'
        })
        .expectStatus(201)
})

it('post and get using data store', async () => {
    await spec()
        .post('/posts')
        .withJson({ '@DATA:TEMPLATE@': 'PostTemplate2' })
        .stores('postId', 'id')
        .expectStatus(201)

    await spec()
        .get('/posts/{id}')
        .withPathParams('id', '$S{postId}')
        .expectStatus(200)
})

it('post using data map', async () => {
    await spec()
        .post('/posts')
        .withJson({
            title: '$M{postTypes.important}',
            body: 'Mapped data'
        })
        .expectStatus(201);
})
