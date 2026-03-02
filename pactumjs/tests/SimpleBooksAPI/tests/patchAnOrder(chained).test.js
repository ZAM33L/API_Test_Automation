const PostApis = require('../apis/postAPIs')
const GetApis = require('../apis/getAPIs')
const PatchApis = require('../apis/patchAPIs')

describe('patch an order', () => {

    let orderID;
    let token;

    const clName = "Sundar Picchhai"
    const clEmail = "sp50978@example.com"

    const o_bId1 = 1
    const o_cuName = "Gopal"
    const updated_o_cuName = "Fayaaz"


    it('client creation', async () => {
        const res = await PostApis.postApiClient(clName, clEmail)
        token = res.body.accessToken
        console.log("token is === ", token)
    })

    it('order creation', async () => {
        const res = await PostApis.postOrderAndStoreItsID(o_bId1, o_cuName)
        orderID = res.body.orderId
        console.log("order posted is === ", res.body)
    })

    it('retrieval of order', async () => {
        const res = await GetApis.getAnOrderByIdandToken(orderID, token)
        console.log("order retrieved is === ", res.body)
    })
    it('patching of order', async () => {
        await PatchApis.patchAnOrder(orderID, updated_o_cuName, token)
        const res = await GetApis.getAnOrderById(orderID, token)
        console.log("patched order is === ", res.body)
    })
})