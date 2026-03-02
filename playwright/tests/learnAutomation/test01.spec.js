import { test, expect } from '@playwright/test'

const baseUrl = 'https://jsonplaceholder.typicode.com'

test.describe("JSONPlaceholder API Tests", () => {

    test.describe("GET Requests", () => {

        test("GET /posts", async ({ request }) => {
            const response = await request.get(`${baseUrl}/posts`)
            expect(response.status()).toBe(200)
        })

        test("GET /posts/1", async ({ request }) => {
            const response = await request.get(`${baseUrl}/posts/1`)
            expect(response.status()).toBe(200)

            const body = await response.json()
            expect(body.id).toBe(1)
        })

        test("GET /posts/1/comments", async ({ request }) => {
            const response = await request.get(`${baseUrl}/posts/1/comments`)
            expect(response.status()).toBe(200)
        })

        test("GET /comments?postId=1", async ({ request }) => {
            const response = await request.get(`${baseUrl}/comments?postId=1`)
            expect(response.status()).toBe(200)
        })

    })

    test.describe("POST Requests", () => {

        test("POST /posts", async ({ request }) => {
            const response = await request.post(`${baseUrl}/posts`, {
                data: {
                    title: "New Post",
                    body: "Test body",
                    userId: 1
                }
            })

            expect(response.status()).toBe(201)
        })

    })

    test.describe("PUT Requests", () => {

        test("PUT /posts/1", async ({ request }) => {
            const response = await request.put(`${baseUrl}/posts/1`, {
                data: {
                    id: 1,
                    title: "Updated Title",
                    body: "Updated body",
                    userId: 1
                }
            })

            expect(response.status()).toBe(200)
        })

    })

    test.describe("PATCH Requests", () => {

        test("PATCH /posts/1", async ({ request }) => {
            const response = await request.patch(`${baseUrl}/posts/1`, {
                data: {
                    title: "Patched Title"
                }
            })

            expect(response.status()).toBe(200)
        })

    })

    test.describe("DELETE Requests", () => {

        test("DELETE /posts/1", async ({ request }) => {
            const response = await request.delete(`${baseUrl}/posts/1`)
            expect(response.status()).toBe(200)
        })

    })

})