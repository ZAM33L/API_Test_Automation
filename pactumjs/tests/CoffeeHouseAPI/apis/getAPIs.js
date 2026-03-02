const BaseAPI = require('../apis/baseAPI')

class GetApis extends BaseAPI {

    getStatus() {
        return this.requestBaseURL()
            .get('/status')
            .expectStatus(200)
    }

    getAllProducts() {
        return this.requestBaseURL()
            .get('/products')
            .expectStatus(200)
    }

    getAllProductsByPage(pageNo) {
        return this.requestBaseURL()
            .get('/products')
            .withQueryParams({
                page: pageNo
            })
            .expectStatus(200)
    }

    getAllProductsByLimit(limitLevel) {
        return this.requestBaseURL()
            .get('/products')
            .withQueryParams({
                limit: limitLevel
            })
            .expectStatus(200)
    }

    getAllProductsByCategory(categoryName) {
        return this.requestBaseURL()
            .get('/products')
            .withQueryParams({
                category: categoryName
            })
            .expectStatus(200)
    }

    getAllProductsInt(pageNo, limitLevel, categoryName) {
        return this.requestBaseURL()
            .get('/products')
            .withQueryParams({
                page: pageNo,
                limit: limitLevel,
                category:categoryName
            })
            .expectStatus(200);
    }

    
    getAllProductsAdv(pageNo = null, limitLevel = null, categoryName = null) {

        const queryPassed = {}

        if (pageNo != null) queryPassed.page = pageNo
        if(limitLevel != null) queryPassed.limit = limitLevel
        if(categoryName != null) queryPassed.category = categoryName

        return this.requestBaseURL()
            .get('/products')
            .withQueryParams(queryPassed)
    }

    getAProduct(pId){
        return this.requestBaseURL()
        .get('/products/:productId')
        .withPathParams('productId',pId)
        .expectStatus(200)
    }

    getAllOrders(){
        return this.requestBaseURL()
        .get('/orders')
        .expectStatus(200)
    }
    getAnOrder(oId){
        return this.requestBaseURL()
        .get('/orders/:orderId')
        .withPathParams('orderId',oId)
        .expectStatus(200)
    }
}

module.exports = new GetApis()