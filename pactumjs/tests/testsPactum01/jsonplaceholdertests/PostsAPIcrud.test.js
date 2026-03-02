const { spec } = require("pactum")
const assert = require('assert')

describe("Posts API CRUD ops", () => {
    let postId;

    it("GET ops", async () => {
        const response = await spec()
            .get('https://jsonplaceholder.typicode.com/posts')
            .expectStatus(200)
            .expectJsonLength('>', 0);
    });

    it("POST ops", async () => {
        const response = await spec()
            .post('https://jsonplaceholder.typicode.com/posts')
            .withJson({
                title: 'PactumJS Post',
                body: 'Learning API testing',
                userId: 1
            })
            .expectStatus(201)
            .expectJsonLike({
                title: 'PactumJS Post'
            });
    })

    it("PUT ops", async () => {
        const response = await spec()
            .put(`https://jsonplaceholder.typicode.com/posts/1`)
            .withJson({
                id: 1,
                title: 'Updated Title',
                body: 'Updated Body',
                userId: 1
            })
            .expectStatus(200)
            .expectJsonLike({
                title: 'Updated Title'
            })
    })

    it("DELETE ops",async()=>{
        await spec()
        .delete('https://jsonplaceholder.typicode.com/posts/1')
        .expectStatus(200)
    })
})
