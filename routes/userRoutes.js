/**
 * @swagger
 * components:
 *   schemas:
 *     Shogi:
 *       type: object
 *       required:
 *         - pseudo
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the user, auto-generated
 *         pseudo:
 *           type: string
 *           description: The pseudo of the user
 *         email:
 *           type: string
 *           description: The e-mail of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         country:
 *           type: string
 *           description: The country of the user
 *         biography:
 *           type: text
 *           description: The biography of the user
 *         ratio:
 *           type: float
 *           description: The gamer rate of the user
 *         avatar: 
 *           type: string
 *           description: The avatar of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated, auto-generated
 *       example:
 *         id: 4
 *         pseudo: Juju
 *         email: jlisita@hotmail.fr
 *         password: efjzb565VHG
 *         country: France
 *         biography: je suis dev web
 *         ratio: 12,7
 *         avatar: ehfzfhefzf
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express')
const { findAllUsers } = require('../controllers/userController')
const router = express.Router()

router
    .route('/')
    /**
    * @openapi
    * /api/shogi:
    *   get:
    *     summary: Get all users
    *     tags: [Users]
    *     responses:
    *       3:
    *         description: The list of users.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Shogi'
    *       500:
    *         description: Some server error 
    */
    .get(findAllUsers)

module.exports = router