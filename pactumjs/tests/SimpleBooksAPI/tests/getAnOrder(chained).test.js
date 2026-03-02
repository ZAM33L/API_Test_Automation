const PostApis = require('../apis/postAPIs')
const GetApis = require('../apis/getAPIs')

describe('get an order' , ()=>{

    const clName = "Tawfeeq R"
    const clEmail = "tn786@example.com"

    const o_bId1= 1
    const o_bId2= 1
    const o_cuName1 = "RamGopal"
    const o_cuName2 = "Fayaaz"


    it('client creation',async()=>{
        const res  = await PostApis.postApiClient(clName,clEmail)
        console.log("token is === ",res.body.accessToken)
    })

    it('order creation',async()=>{
            const res = await PostApis.postOrderAndStoreItsID(o_bId1,o_cuName1)
            console.log("order posted is === " , res.body)
     })
       
    it('retrieval of order',async()=>{
        const res = await GetApis.getAnOrderById()
        console.log("order retrieved is === ",res.body)
    })
})