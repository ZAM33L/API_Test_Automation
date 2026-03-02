const { spec } = require('pactum');

const BASE_URL = 'http://localhost:4000';

function createPost(payload) {
    return spec()
        .post(`${BASE_URL}/posts`)
        .withJson(payload);
}

function getPosts() {
    return spec()
        .get(`${BASE_URL}/posts`);
}

function updatePost(id, payload) {
    return spec()
        .put(`${BASE_URL}/posts/${id}`)
        .withJson(payload);
}

function getUpdatedPost() {
    return spec()
        .get(`${BASE_URL}/posts`);
}

function deletePost(id) {
    return spec()
        .delete(`${BASE_URL}/posts/${id}`);
}

function confirmDeletedPost(id) {
    return spec()
        .get(`${BASE_URL}/posts/${id}`);
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    getUpdatedPost,
    deletePost,
    confirmDeletedPost
};
