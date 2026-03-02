const { faker } = require('@faker-js/faker');


module.exports = {
    queryParams1: {
        pageNo: 1,
        limitLevel: 3,
        categoryName: 'pastry'
    },
    productParams1: {
        productId: 3001
    },
    clientData: {
        clientEmail: 'jamee@gmail.com'
    },
    customerData: {
        cuName: () => faker.person.fullName(),
    },
    orderData: {
        products: [
            { id: 2001, quantity: 1 },
            { id: 2002, quantity: 3 }
        ],
    }

};
