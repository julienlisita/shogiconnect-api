const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

require("./db/sequelizeSetup");

app
    .use(express.json())
    .use(cookieParser())
    .use(cors({ origin: 'http://localhost:5173', credentials: true}));

if (process.env.NODE_ENV === "development") {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const topicRouter = require('./routes/topicRoutes');
const commentRouter = require('./routes/commentRoutes');
const userStatRouter = require('./routes/userStatRoutes');
const userActivityRouter = require('./routes/userActivityRoutes')
const scheduledGameRouter = require('./routes/scheduledGameRoutes');
const adminActivityRouter = require('./routes/adminActivityRoutes');

app.get('/', (req, res) => {
    res.json({ message: 'Homepage' })
})

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/topics', topicRouter);
app.use('/api/comments', commentRouter);
app.use('/api/userStats', userStatRouter);
app.use('/api/userActivities', userActivityRouter);
app.use('/api/adminActivities', adminActivityRouter);
app.use('/api/scheduledGames', scheduledGameRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const swagger = require('./configs/swagger');
swagger(app);

app.listen(port, () => console.log(`app listening on port: ${port}`))