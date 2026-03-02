const PostApis = require('../apis/postAPIs')

describe('post orders' , ()=>{

    const cName = "Tawfeeq M"
    const cEmail = "tn460@example.com"
    const c_bId = 6

    it('client creation',async()=>{
        const res  = await PostApis.postApiClient(cName,cEmail)
        console.log(res.body.accessToken)
    })
    it('order creation ',async()=>{
        const res = await PostApis.postOrder(c_bId,cName)
        console.log(res.body)
    })
})