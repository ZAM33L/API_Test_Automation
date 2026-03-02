const PostApis = require('../apis/postAPIs')
const { customerData, orderData } = require('../data/productData.query')
const orderStore = require('../utils/orderStore');
const orderResponseSchema = require('../schemas/order.response.schema')

describe('post an order [@postOrder]', () => {

    it('posting an order[@postAnOrder]', async () => {

        const generatedCuName = customerData.cuName()
        const orderPassed = {
            customerName: generatedCuName,
            products: orderData.products
        }
        const res = await PostApis.postOrder(orderPassed)
        console.log("===============")
        console.log(res.body)
        console.log("===============")

        const key = `o${Object.keys(orderStore.orderIDs).length + 1}`;
        orderStore.orderIDs[key] = res.json.id;
        console.log("order id stored:", res.json.id)
        console.log("===============")

        //assertions
        expect(res.json.customerName).to.equal(generatedCuName);
        expect(res.json.id).to.match(/^[A-Z0-9_-]{9}$/)


    })

    it('schema assertion [@assertSChema]',async()=>{
        
        const orderPassed = {
            customerName: customerData.cuName(),
            products: orderData.products
        }
        await PostApis.postOrder(orderPassed).expectJsonSchema(orderResponseSchema)
        
        
    })

})