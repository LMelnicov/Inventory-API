const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Inventory API",
            version: "1.0.0",
            description: "API para gestión de inventario"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
        components: {
            schemas: {
                Product: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "6846e7d0a7d8c5f123456789"
                        },
                        name: {
                            type: "string",
                            example: "Coca Cola"
                        },
                        stock: {
                            type: "number",
                            example: 25
                        },
                        price: {
                            type: "number",
                            example: 1200
                        }
                    }
                }
            }
        }
    },

    apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = specs;