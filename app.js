const express = require('express');

const app = express();
const port = 3000;

require("./db/sequelizeSetup");

if (process.env.NODE_ENV === "development") {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.listen(port, () => console.log(`app listening on port: ${port}`))