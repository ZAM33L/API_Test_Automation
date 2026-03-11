import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { stringFormat } from '../../utils/common';


const postAPI_static_body = require("./staticBody.json")
const postAPI_dynamic_body = require("./dynamicBody.json")
const credentials = require("./credential.json")
const putAPI_static_body = require("./put_request_body.json")

const bURL = "https://restful-booker.herokuapp.com"

test.describe("PUT API tests", () => {

    test("1 . PUT API request using static body", async ({ request }) => {

        console.log("========== POST ==========")

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

        console.log("========= GET ===========")

        const getAPI_response =await request.get(`${bURL}/booking/${bId}`)
        const getAPI_response_body = await getAPI_response.json()
        console.log(getAPI_response_body)

        // assertions
        expect(getAPI_response.ok()).toBeTruthy()
        expect(getAPI_response.status()).toBe(200)
        expect(getAPI_response_body).toHaveProperty("firstname", "jameel")
        expect(getAPI_response_body.bookingdates).toHaveProperty("checkin", "2018-01-01")

        console.log("========== PUT =========")

        //generate token
        const token_response = await request.post(`${bURL}/auth`, {
            data:credentials
        })

        const token_response_body = await token_response.json()
        const token_number = await token_response_body.token;
        console.log("token number is : ",token_number)

        //PUT API call

        const putAPI_response = await request.put(`${bURL}/booking/${bId}`, {
            headers:{
                "Content-Type":"application/json",
                "Cookie":`token=${token_number}`
            },
            data:putAPI_static_body
        })

        const putAPI_response_body = await putAPI_response.json()
        console.log(putAPI_response_body)

        // assertions
        expect(getAPI_response.ok()).toBeTruthy()
        expect(getAPI_response.status()).toBe(200)


    })

    
})

