const BaseAPI = require('../apis/baseAPI')

class PatchApis extends BaseAPI {
    patchAnOrder(orderID,updated_cuName,token){
        return this.requestBaseURL()
        .patch('/orders/{orderId}')
        .withHeaders('Authorization',`Bearer $S{token}`)
        .withPathParams('orderId',orderID)
        .withJson({
            customerName:updated_cuName
        })
        .expectStatus(204)
    }
}

module.exports = new PatchApis()