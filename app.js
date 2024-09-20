const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 3000;

require("./db/sequelizeSetup");

app
    .use(express.json())
    .use(cookieParser())
    .use(cors({ origin: 'http://localhost:5173'}));

if (process.env.NODE_ENV === "development") {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const topicRouter = require('./routes/topicRoutes');
const commentRouter = require('./routes/commentRoutes');
const userStatRouter = require('./routes/userStatRoutes');
const gameRouter = require('./routes/gameRoutes');


app.get('/', (req, res) => {
    res.json({ message: 'Homepage' })
})

app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/topics', topicRouter);
app.use('/api/comments', commentRouter);
app.use('/api/userStats', userStatRouter);
app.use('/api/games', gameRouter);

const swagger = require('./configs/swagger');
swagger(app);

app.listen(port, () => console.log(`app listening on port: ${port}`))