const postMocks = require("../componentTesting/mockreturns.mock")
const postApi = require("../componentTesting/apiReturns.api")


describe('Post Service - Component Test', () => {

  before(() => postMocks.startMockServer());
  after(() => postMocks.stopMockServer());

  it('should create a post', async () => {
    postMocks.mockCreatePost();

    await postApi.createPost({
      title: 'Mock Post',
      body: 'This is mocked content'
    })
      .expectStatus(201)
      .expectJsonLike({
        title: 'Mock Post',
        body: 'Mock Content'
      });
  });
});
