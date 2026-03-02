const GetApis = require('../apis/getAPIs')
const { productParams1 } = require('../data/productData.query')

describe('get a product of coffee house [@singleProduct]', () => {

    it('getting a single product [@getASingleProduct]', async () => {
        const res = await GetApis.getAProduct(productParams1.productId)
        console.log("===============")
        console.log(res.body)
        console.log("===============")
    })
})