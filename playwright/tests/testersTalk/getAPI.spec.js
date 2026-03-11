import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { stringFormat } from '../../utils/common';


const postAPI_static_body = require("./staticBody.json")
const postAPI_dynamic_body = require("./dynamicBody.json")

const bURL = "https://restful-booker.herokuapp.com"

test.describe("GET API tests", () => {

    test("1 . GET API request using static body", async ({ request }) => {

        const postAPI_response = await request.post(`${bURL}/booking`, {
            data: {
                firstname: "jameel",
                lastname: "asfer",
                totalprice: 1000,
                depositpaid: true,
                bookingdates: {
                    checkin: "2018-01-01",
                    checkout: "2019-01-01"
                },
                additionalneeds: "book wrappers"
            }
        })

        const postAPI_response_body = await postAPI_response.json()
        console.log(postAPI_response_body)
        const bId = postAPI_response_body.bookingid;

        // assertions
        expect(postAPI_response.ok()).toBeTruthy()
        expect(postAPI_response.status()).toBe(200)
        expect(postAPI_response_body.booking).toHaveProperty("firstname", "jameel")
        expect(postAPI_response_body.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")

        console.log("====================")

        const getAPI_response =await request.get(`${bURL}/booking/${bId}`)
        const getAPI_response_body = await getAPI_response.json()
        console.log(getAPI_response_body)

        // assertions
        expect(getAPI_response.ok()).toBeTruthy()
        expect(getAPI_response.status()).toBe(200)
        expect(getAPI_response_body).toHaveProperty("firstname", "jameel")
        expect(getAPI_response_body.bookingdates).toHaveProperty("checkin", "2018-01-01")

        console.log("====================")

    })

    test("2 . GET API request using query parameters ", async ({ request }) => {

        const dynamicBody = stringFormat(JSON.stringify(postAPI_dynamic_body),
            "lena","tamil","superbowls"
        )
        const postAPI_response = await request.post(`${bURL}/booking`, {
            data: JSON.parse(dynamicBody)
        })

        const postAPI_response_body = await postAPI_response.json()
        console.log(postAPI_response_body)
        const bId = postAPI_response_body.bookingid;

        // assertions
        expect(postAPI_response.ok()).toBeTruthy()
        expect(postAPI_response.status()).toBe(200)
        expect(postAPI_response_body.booking).toHaveProperty("lastname", "tamil")
        expect(postAPI_response_body.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")

        console.log("====================")

        const getAPI_response =await request.get(`${bURL}/booking/`,{
            params:{
                "firstname":"lena",
                "lastname":"tamil"
            }
        })
        const getAPI_response_body = await getAPI_response.json()
        console.log(getAPI_response_body)

        // assertions
        expect(getAPI_response.ok()).toBeTruthy()
        expect(getAPI_response.status()).toBe(200)
        expect(Array.isArray(getAPI_response_body)).toBeTruthy()
        const bookingIds = getAPI_response_body.map(b => b.bookingid)
        expect(bookingIds).toContain(bId)

        console.log("====================")

    })

})

