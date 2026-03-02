const { spec } = require('pactum');
describe('Posts API', () => {
    it('should create a post and then fetch it', async () => {
        // Create a new post (POST)
        const createResponse = await spec()
            .post('https://jsonplaceholder.typicode.com/posts')
            .withJson({
                title: 'API Testing with Pactum',
                body: 'This is a sample post',
                userId: 1
            })
            .expectStatus(201)
            .expectJsonLike({
                id:101,
                title: 'API Testing with Pactum',
                body: 'This is a sample post',
                userId: 1
            });
        // Fetch the created post (GET)
        await spec()
            .get(`https://jsonplaceholder.typicode.com/posts/101`)
            .expectStatus(200)
            .expectJsonLike({
                id: 101,
                title: 'API Testing with Pactum',
                body: 'This is a sample post',
                userId: 1
            });
    });
});
