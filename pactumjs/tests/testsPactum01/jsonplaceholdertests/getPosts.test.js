const {spec} = require("pactum")

it("get posts from the link",async ()=>{
    await spec()
    .get('https://jsonplaceholder.typicode.com/posts')
    .expectStatus(200)
    .expectJsonLike([{id:1}])
})