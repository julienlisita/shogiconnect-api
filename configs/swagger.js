const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Définir les options pour swagger-jsdoc
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Shogi APIRest Swagger",
            version: "1.0.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger"
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"], // Les fichiers contenant des annotations Swagger
};

// Initialiser swagger-jsdoc
const specs = swaggerJsdoc(options)

// Utiliser swagger-ui-express pour servir la documentation
module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}