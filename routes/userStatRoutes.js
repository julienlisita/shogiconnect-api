const express = require('express');
const {
    findAllUserStats,
    findUserStatById,
    createUserStat,
    updateUserStat,
    deleteUserStat,
} = require('../controllers/userStatController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserStat:
 *       type: object
 *       required:
 *         - wins
 *         - losses
 *         - draws
 *         - score
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the user stat, auto-generated
 *         wins:
 *           type: integer
 *           description: Number of wins
 *         losses:
 *           type: integer
 *           description: Number of losses
 *         draws:
 *           type: integer
 *           description: Number of draws
 *         score:
 *           type: integer
 *           description: Total score
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user stat was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user stat was updated, auto-generated
 *       example:
 *         id: 1
 *         wins: 10
 *         losses: 5
 *         draws: 3
 *         score: 20
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

router
    .route('/')
    /**
    * @openapi
    * /api/user_stats:
    *   get:
    *     summary: Get all user stats
    *     tags: [UserStats]
    *     responses:
    *       200:
    *         description: The list of user stats.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/UserStat'
    *       500:
    *         description: Some server error 
    */
    .get(findAllUserStats)
    /**
    * @openapi
    * /api/user_stats:
    *   post:
    *     summary: Create a new user stat
    *     tags: [UserStats]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/UserStat'
    *     responses:
    *       201:
    *         description: The created user stat.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UserStat'
    *       500:
    *         description: Some server error 
    */
    .post(createUserStat);

router
    .route('/:id')
    /**
    * @openapi
    * /api/user_stats/{id}:
    *   get:
    *     summary: Get user stat by id
    *     tags: [UserStats]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The user stat id
    *     responses:
    *       200:
    *         description: The user stat response by id
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UserStat'
    *       404:
    *         description: The user stat was not found
    */
    .get(findUserStatById)
    /**
    * @openapi
    * /api/user_stats/{id}:
    *   put:
    *     summary: Update user stat by id
    *     tags: [UserStats]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The user stat id
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/UserStat'
    *     responses:
    *       200:
    *         description: User stat updated
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UserStat'
    *       404:
    *         description: The user stat was not found
    */
    .put(updateUserStat)
    /**
    * @openapi
    * /api/user_stats/{id}:
    *   delete:
    *     summary: Delete user stat by id
    *     tags: [UserStats]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The user stat id
    *     responses:
    *       200:
    *         description: User stat deleted
    *       404:
    *         description: The user stat was not found
    */
    .delete(deleteUserStat);

module.exports = router;