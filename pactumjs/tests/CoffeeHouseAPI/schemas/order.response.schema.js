const orderResponseSchema = {
    type: 'object',
    additionalProperties: false, 
    properties: {
        id: {
            type: 'string',
            pattern:'^[A-Z0-9_-]{9}$'
        },
        clientId: {
            type: 'string',
            minLength: 1
        },
        created: {
            type: 'string',
            format:'date-time'
        },
        customerName: {
            type: 'string',
            minLength: 1
        },
        products: {
            type: 'array',
            items: {
                type: 'object',
                minItems: 1,
                additionalProperties: false, 
                properties: {
                    id: {
                        type: 'number'
                    },
                    quantity: {
                        type: 'number',
                        minimum: 1
                    }
                },
                required: ['id', 'quantity']
            }
        }
    },
    required: ['id', 'clientId', 'created', 'customerName', 'products']
};

module.exports = orderResponseSchema;
