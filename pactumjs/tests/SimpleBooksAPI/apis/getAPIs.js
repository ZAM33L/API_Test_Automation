const BaseAPI = require('../apis/baseAPI')

class GetApis extends BaseAPI {
    getStatus(){
        return this.requestBaseURL()
        .get('/status')
        .expectStatus(200)
    }
    getListOfBooksWithInspect(){
        return this.requestBaseURL()
        .get('/books')
        .expectStatus(200)
        .inspect()
    }
    getListOfBooks(){
        return this.requestBaseURL()
        .get('/books')
        .expectStatus(200)
    }
    getListOfBooksByType(type){
        return this.requestBaseURL()
        .get('/books')
        .withQueryParams({type})
        .expectStatus(200)
    }
    getListOfBooksByLimit(limit){
        return this.requestBaseURL()
        .get('/books')
        .withQueryParams({limit})
        .expectStatus(200)
    }
    getABookByIDwithInspect(bookId){
        return this.requestBaseURL()
        .get('/books/{id}')
        .withPathParams('id',bookId)
        .expectStatus(200)
        .inspect()
    }
    getABookByID(bookId){
        return this.requestBaseURL()
        .get('/books/{id}')
        .withPathParams('id',bookId)
        .expectStatus(200)
    }
    getOrders(){
        return this.requestBaseURL()
        .get('/orders')
        .withHeaders('Authorization','Bearer $S{token}')
        .expectStatus(200)
    }
    getAnOrderById(orderID){
        return this.requestBaseURL()
        .get('/orders')
        .withHeaders('Authorization','Bearer $S{token}')
        .withPathParams('orderId',orderID)
        .expectStatus(200)
    }
    getAnOrderByIdandToken(orderID,token){
        return this.requestBaseURL()
        .get('/orders/{orderId}')
        .withHeaders('Authorization',`Bearer $S{token}`)
        .withPathParams('orderId',orderID)
        .expectStatus(200)
    }
}

module.exports = new GetApis()