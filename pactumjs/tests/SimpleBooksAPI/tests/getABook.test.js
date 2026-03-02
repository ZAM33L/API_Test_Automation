const GetApis = require('../apis/getAPIs')

describe('get a book' , ()=>{
    it('retrieval of a book with Inspect [@inspect]',async()=>{
        await GetApis.getListOfBooksWithInspect()
    })
    it('retrieval of a book [@general]',async()=>{
        const bookId = 1
        const res = await GetApis.getABookByID(bookId)
        console.log(res.body)
    })
})