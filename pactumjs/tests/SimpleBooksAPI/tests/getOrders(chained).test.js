const PostApis = require('../apis/postAPIs')
const GetApis = require('../apis/getAPIs')

describe('get all orders' , ()=>{

    const clName = "Tawfeeq U"
    const clEmail = "tn680@example.com"

    const o_bId1= 5
    const o_bId2= 1
    const o_cuName1 = "Faazil"
    const o_cuName2 = "Fayaaz"


    it('client creation',async()=>{
        const res  = await PostApis.postApiClient(clName,clEmail)
        console.log("token is === ",res.body.accessToken)
    })

    it('order creation 1',async()=>{
            const res = await PostApis.postOrder(o_bId1,o_cuName1)
            console.log("order 1 is === " , res.body)
     })
     it('order creation 2',async()=>{
            const res = await PostApis.postOrder(o_bId2,o_cuName2)
            console.log("order 2 is === " , res.body)
     })
    
    it('retrieval of orders',async()=>{
        const res = await GetApis.getOrders()
        console.log("orders are === ",res.body)
    })
})