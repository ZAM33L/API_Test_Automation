const GetApis = require('../apis/getAPIs')

describe('get status of API',()=>{
    it('assert the status of API', async ()=>{
        await GetApis.getStatus()
    })
})