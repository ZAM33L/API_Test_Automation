const BaseAPI = require('../apis/baseAPI');
const { customerName } = require('../data/productData.query');
// const ParamsFile = require('../data/productData.query')

class PostApis extends BaseAPI {

    postClient(clEmail) {
        return this.requestBaseURL()
            .post('/clients')
            .withJson({
                email: clEmail
            })
            .expectStatus(200); // or 200 depending on API
    }

    postOrder(cuName, productArray) {
        return this.requestBaseURL()
            .post('/orders')
            .withJson({
                customerName: cuName,
                products: productArray
            })
            .expectStatus(201);
    }
}

module.exports = new PostApis()