const PostApis = require('../apis/postAPIs')

describe('post a client ' , ()=>{
    it('client creation [@inspect]',async()=>{
        await PostApis.postApiClientWithInspect(
            'ValentinoRossi',
            'vr46@example.com'
        )
    })
    it('client creation [@general]',async()=>{
        const res = await PostApis.postApiClient(
            'CharlesL',
            'txm678@example.com'
        )
        console.log(res.body.accessToken)
    })
})