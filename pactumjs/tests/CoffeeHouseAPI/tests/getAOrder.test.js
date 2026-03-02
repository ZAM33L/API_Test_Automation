const GetApis = require('../apis/getAPIs')
const orderStore = require('../utils/orderStore') 

describe('get an order of coffee house [@singleorder]', () => {

    it('getting a single order [@getASingleorder]', async () => {
        const res = await GetApis.getAnOrder(orderStore.orderIDs.o1)
        console.log("===============")
        console.log(res.body)
        console.log("===============")
    })
})