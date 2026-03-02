const GetApis = require('../apis/getAPIs')

describe('get all orders of coffee house [@runAllOrders]', () => {

    it('getting all orders [@getAllOrders]', async () => {
        const res = await GetApis.getAllOrders()
        console.log("===============")
        console.log(res.body)
        console.log("===============")
    })
})