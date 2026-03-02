const { mock } = require('pactum');

function startMockServer(port = 4000) {
  mock.start(port);
}

function stopMockServer() {
  mock.stop();
}

function mockCreatePost() {
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
        body: 'Mock Content'
      }
    }
  });
}

module.exports = {
  startMockServer,
  stopMockServer,
  mockCreatePost
};
