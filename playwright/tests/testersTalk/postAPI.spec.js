import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { stringFormat } from '../../utils/common';


const postAPI_static_body = require("./staticBody.json")
const postAPI_dynamic_body = require("./dynamicBody.json")

const bURL = "https://restful-booker.herokuapp.com"

test.describe("POST API tests", () => {

    test("1 . POST API request using static body", async ({ request }) => {

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

        // assertions
        expect(postAPI_response.ok()).toBeTruthy()
        expect(postAPI_response.status()).toBe(200)
        expect(postAPI_response_body.booking).toHaveProperty("firstname", "jameel")
        expect(postAPI_response_body.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")

    })

    test("2  . POST API request using static json file", async ({ request }) => {

        const postAPI_response = await request.post(`${bURL}/booking`, {
            data: postAPI_static_body
        })

        const postAPI_response_body = await postAPI_response.json()
        console.log(postAPI_response_body)

        // assertions
        expect(postAPI_response.ok()).toBeTruthy()
        expect(postAPI_response.status()).toBe(200)
        expect(postAPI_response_body.booking).toHaveProperty("lastname", "jameel")
        expect(postAPI_response_body.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")

    })

    test("3  . POST API request using dynamic body", async ({ request }) => {

        const fName = faker.person.firstName()
        const lName = faker.person.lastName()
        const tPrice = faker.number.int(1000)

        const ci_date = DateTime.now().toFormat('yyyy-MM-dd');
        const co_date = DateTime.now().plus({ day: 5 }).toFormat('yyyy-MM-dd');

        const postAPI_response = await request.post(`${bURL}/booking`, {
            data:
            {
                "firstname": fName,
                "lastname": lName,
                "totalprice": tPrice,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": ci_date,
                    "checkout": co_date
                },
                "additionalneeds": "book wrappers"
            }

        })

        const postAPI_response_body = await postAPI_response.json()
        console.log(postAPI_response_body)

        // assertions
        expect(postAPI_response.ok()).toBeTruthy()
        expect(postAPI_response.status()).toBe(200)
        expect(postAPI_response_body.booking).toHaveProperty("totalprice", tPrice)
        expect(postAPI_response_body.booking.bookingdates).toHaveProperty("checkout", co_date)

    })

    test("4  . POST API request using dynamic json file", async ({ request }) => {

        const dynamicBody = stringFormat(JSON.stringify(postAPI_dynamic_body),
            "lena","tamil","superbowls"
        )
        const postAPI_response = await request.post(`${bURL}/booking`, {
            data: JSON.parse(dynamicBody)
        })

        const postAPI_response_body = await postAPI_response.json()
        console.log(postAPI_response_body)

        // assertions
        expect(postAPI_response.ok()).toBeTruthy()
        expect(postAPI_response.status()).toBe(200)
        expect(postAPI_response_body.booking).toHaveProperty("lastname", "tamil")
        expect(postAPI_response_body.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")

    })



})

