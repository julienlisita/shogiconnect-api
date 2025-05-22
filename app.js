// app.js

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

require("./db/sequelizeSetup");
  
const allowedOrigins = ['https://shogiconnect.netlify.app', 'http://localhost:5173'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pré-vol OPTIONS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app
    .use(express.json())
    .use(cookieParser())

if (process.env.NODE_ENV === "development") {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

//  En dev : logs
if (process.env.NODE_ENV === "development") {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

//  Routes
app.get('/', (req, res) => res.json({ message: 'Homepage' }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/userStats', require('./routes/userStatRoutes'));
app.use('/api/userActivities', require('./routes/userActivityRoutes'));
app.use('/api/adminStats', require('./routes/adminStatRoutes'));
app.use('/api/adminActivities', require('./routes/adminActivityRoutes'));
app.use('/api/scheduledGames', require('./routes/scheduledGameRoutes'));
app.use('/api/siteStats', require('./routes/siteStatRoutes'));

//  Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  Swagger
require('./configs/swagger')(app);

//  Start server
app.listen(port, () => console.log(`🚀 Server ready on port ${port}`));