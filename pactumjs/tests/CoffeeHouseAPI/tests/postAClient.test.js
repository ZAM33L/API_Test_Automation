const PostApis = require('../apis/postAPIs')
const {clientData} = require('../data/productData.query')
const authStore = require('../utils/authStore')

describe('post a client registration [@postClient]', () => {

    it('postting a client[@postClRegn]', async () => {
        const res = await PostApis.postClient(clientData.clientEmail)
        console.log("===============")
        console.log(res.body)
        console.log("===============")

        authStore.token = res.body.token

        console.log("token stored in authStore")
    })

})