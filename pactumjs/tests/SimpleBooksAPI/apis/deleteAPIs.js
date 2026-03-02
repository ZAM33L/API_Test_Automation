const BaseAPI = require('../apis/baseAPI')

class DeleteApis extends BaseAPI {

    deleteAnOrder(orderID,token) {
        return this.requestBaseURL()
            .delete('/orders/{orderId}')
            .withHeaders('Authorization', 'Bearer $S{token}')  
            .withPathParams('orderId', orderID)                 
            .expectStatus(204)                                 
    }
}

module.exports = new DeleteApis()
