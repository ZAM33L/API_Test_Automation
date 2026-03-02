const {spec, request}=require('pactum');
const{BASE_URL} = require('../configs/env')

request.setBaseUrl(BASE_URL)

class BaseAPI {
    requestBaseURL(){
        return spec()
    }
}

module.exports = BaseAPI