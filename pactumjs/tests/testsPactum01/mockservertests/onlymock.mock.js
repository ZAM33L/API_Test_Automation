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

function mockGetPosts(postId) {
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
                    body: 'Mock Content'
                }
            ]
        }
    });
}

function mockUpdatePost(postId) {
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
                body: 'Updated Content'
            }
        }
    });
}

function mockGetUpdatedPost(postId) {
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
}

function mockDeletePost(postId) {
    mock.addInteraction({
        request: {
            method: 'DELETE',
            path: `/posts/${postId}`
        },
        response: {
            status: 200
        }
    });
}

function mockConfirmDeletionPost(postId) {
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
}

module.exports = {
    startMockServer,
    stopMockServer,
    mockCreatePost,
    mockGetPosts,
    mockUpdatePost,
    mockGetUpdatedPost,
    mockDeletePost,
    mockConfirmDeletionPost
};