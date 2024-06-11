const express = require('express')
const { findAllUsers } = require('../controllers/userController')
const router = express.Router()

router
    .route('/')
    .get(findAllUsers)

module.exports = router