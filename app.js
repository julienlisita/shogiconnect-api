const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

require("./db/sequelizeSetup");

app
    .use(express.json());

if (process.env.NODE_ENV === "development") {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

const userRouter = require('./routes/userRoutes')

app.get('/', (req, res) => {
    res.json({ message: 'Homepage' })
})

app.use('/api/users', userRouter)

const swagger = require('./configs/swagger');
swagger(app);

app.listen(port, () => console.log(`app listening on port: ${port}`))