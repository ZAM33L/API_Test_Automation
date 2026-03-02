const GetApis = require('../apis/getAPIs');

describe('get list of books [@getListOfBooks]', () => {

  it('[@inspect] retrieval of books with Inspect', async () => {
    await GetApis.getListOfBooksWithInspect();
  });

  it('[@all] get list of books', async () => {
    const res = await GetApis.getListOfBooks();
    console.log(res.body);
  });

  it('[@type] get list of books by type', async () => {
    const type = 'non-fiction';
    const res = await GetApis.getListOfBooksByType(type);
    console.log(res.body);
  });

  it('[@limit] get list of books by limit', async () => {
    const limit = 5;
    const res = await GetApis.getListOfBooksByLimit(limit);
    console.log(res.body);
  });

});
