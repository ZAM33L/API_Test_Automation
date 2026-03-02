const GetApis = require('../apis/getAPIs')
const { queryParams1 } = require('../data/productData.query')

describe('get all products of coffee house [@runAllCH]', () => {

    it('getting all products [@getAllProducts]', async () => {
        const res = await GetApis.getAllProducts()
        console.log("===============")
        console.log(res.body)
        console.log("===============")
    })

    it('getting all products by page [@getAllProductsByPage]', async () => {
        const res = await GetApis.getAllProductsByPage(queryParams1.pageNo)
        console.log("===============")
        console.log(res.body)
        console.log("===============")
    })

    it('get all products by limit [@getAllProductsByLimit]', async () => {
        const res = await GetApis.getAllProductsByLimit(queryParams1.limitLevel)
        console.log("===============")
        console.log(res.body)
        console.log("===============")
    })

    it('get all products by category [@getAllProductsByCategory]', async () => {
        const res = await GetApis.getAllProductsByCategory(queryParams1.categoryName)
        console.log("===============")
        console.log(res.body)
        console.log("===============")
    })

    it('get all products by all criteria query [@getAllProductsCriteriaAll]', async () => {
        const res = await GetApis.getAllProductsInt(queryParams1.pageNo, queryParams1.limitLevel, queryParams1.categoryName)
        console.log("===============")
        console.log(res.body)
        console.log("===============")
    })

    it('get all products by optional queries [@getAllProductsOptionalParams]', async () => {
        const q1 = await GetApis.getAllProductsInt(queryParams1.pageNo, queryParams1.limitLevel)
        console.log("===============")
        console.log(q1.body)
        console.log("===============")
        //like this we can perform optional queries with atleast one of the three params
    })
})