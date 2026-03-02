const GetApis = require('../apis/getAPIs')
//we can also use this - pactum.request.setBaseUrl('https://simple-books-api.click');

describe('get status of API' , ()=>{
    it('assert the status',async()=>{
        await GetApis.getStatus()
    })
})