const PostApis = require('../apis/postAPIs')
const DeleteApis = require('../apis/deleteAPIs')
const GetApis = require('../apis/getAPIs')

describe('delete an order', () => {

    let orderID
    let token
    const clName = "Tawfeeq Z"
    const clEmail = "ty698@example.com"
    const o_bId = 1
    const o_cuName = "Anil"

    it('client creation', async () => {
        const res = await PostApis.postApiClient(clName, clEmail)
        token = res.body.accessToken
        console.log("token:", token)
    })

    it('order creation', async () => {
        const res = await PostApis.postOrderAndStoreItsID(o_bId, o_cuName)
        orderID = res.body.orderId
        console.log("order created:", res.body)
    })

    it('retrieval of order',async()=>{
            const res = await GetApis.getAnOrderByIdandToken(orderID,token)
            console.log("order retrieved is === ",res.body)
        })

    it('delete the order', async () => {
        await DeleteApis.deleteAnOrder(orderID,token)
        console.log("order deleted:", orderID)
    })

    it('verify deletion', async () => {
        await GetApis.getAnOrderByIdandToken(orderID,token)
        .expectStatus(404)
        .expectJsonLike({
            error: `No order with id ${orderID}.`
        });
    })
})
