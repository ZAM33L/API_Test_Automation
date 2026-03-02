const BaseAPI = require('../apis/baseAPI')

class PostApis extends BaseAPI {

    postApiClientWithInspect(cName,cEmail){
        return this.requestBaseURL()
        .post('/api-clients')
        .withJson({
            clientName:cName,
            clientEmail:cEmail
        })
        .expectStatus(201)
        .inspect()
    }
    postApiClient(cName,cEmail){
        return this.requestBaseURL()
        .post('/api-clients')
        .withJson({
            clientName:cName,
            clientEmail:cEmail
        })
        .stores('token','accessToken')
        .expectStatus(201)
    }
    postOrder(bId,cName){
        return this.requestBaseURL()
        .post('/orders')
        .withHeaders('Authorization','Bearer $S{token}')
        .withJson({
            bookId:bId,
            customerName:cName
        })
        .expectStatus(201)
    }
    postOrderAndStoreItsID(bId,cName){
        return this.requestBaseURL()
        .post('/orders')
        .withHeaders('Authorization','Bearer $S{token}')
        .withJson({
            bookId:bId,
            customerName:cName
        })
        .stores('orderID','id')
        .expectStatus(201)
    }
}

module.exports = new PostApis()