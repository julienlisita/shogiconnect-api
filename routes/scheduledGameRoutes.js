const express = require('express');
const {
    findAllScheduledGames,
    findScheduledGameById,
    createScheduledGame,
    updateScheduledGame,
    deleteScheduledGame,
    joinScheduledGame,
    unsubscribeFromScheduledGame,
} = require('../controllers/scheduledGameController');

const router = express.Router();
const { protect, restrictTo } = require('../middlewares/auth')

/**
 * @swagger
 * components:
 *   schemas:
 *     ScheduledGame:
 *       type: object
 *       required:
 *         - status
 *         - level
 *         - rendezVousAt
 *         - organizerId
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the game, auto-generated
 *         status:
 *           type: string
 *           description: The status of the game (e.g., pending, completed)
 *         level:
 *           type: string
 *           description: The level of the game (e.g., beginner, advanced)
 *         rendezVousAt:
 *           type: string
 *           format: date
 *           description: Date and time of the game
 *         organizerId:
 *           type: integer
 *           description: The ID of the organizer (user)
 *         participantId:
 *           type: integer
 *           description: The ID of the participant (user)
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the game was created, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the game was last updated, auto-generated
 *       example:
 *         id: 1
 *         status: 'pending'
 *         level: 'advanced'
 *         rendezVousAt: 2024-09-25T14:30:00.000Z
 *         organizerId: 2
 *         participantId: 3
 *         createdAt: 2024-09-20T10:00:00.000Z
 *         updatedAt: 2024-09-20T10:00:00.000Z
 */

router
    .route('/')
    /**
    * @openapi
    * /api/scheduledGames:
    *   get:
    *     summary: Get all games
    *     tags: [Games]
    *     responses:
    *       200:
    *         description: The list of games.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Game'
    *       500:
    *         description: Some server error 
    */
    .get(protect, findAllScheduledGames)
    /**
    * @openapi
    * /api/scheduledGames:
    *   post:
    *     summary: Create a new game
    *     tags: [Games]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Game'
    *     responses:
    *       201:
    *         description: The created game.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Game'
    *       500:
    *         description: Some server error 
    */
    .post(protect, createScheduledGame);

router
    .route('/:id')
    /**
    * @openapi
    * /api/scheduledGames/{id}:
    *   get:
    *     summary: Get game by id
    *     tags: [Games]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The game id
    *     responses:
    *       200:
    *         description: The game response by id
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Game'
    *       404:
    *         description: The game was not found
    */
    .get(protect, findScheduledGameById)
    /**
    * @openapi
    * /api/scheduledGames/{id}:
    *   put:
    *     summary: Update game by id
    *     tags: [Games]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The game id
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Game'
    *     responses:
    *       200:
    *         description: Game updated
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Game'
    *       404:
    *         description: The game was not found
    */
    .put(protect, restrictTo("admin"), updateScheduledGame)
    
    /**
    * @openapi
    * /api/scheduledGames/{id}:
    *   delete:
    *     summary: Delete game by id
    *     tags: [Games]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The game id
    *     responses:
    *       200:
    *         description: Game deleted
    *       404:
    *         description: The game was not found
    */
    .delete(protect, restrictTo("admin"), deleteScheduledGame);

router
    .route('/:id/join')
    /**
    * @openapi
    * /api/scheduledGames/{id}/join:
    *   delete:
    *     summary: Delete game by id
    *     tags: [Games]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The game id
    *     responses:
    *       200:
    *         description: Game deleted
    *       404:
    *         description: The game was not found
    */
    .post(protect, joinScheduledGame);
router
    .route('/:id/unsubscribe')
    /**
    * @openapi
    * /api/scheduledGames/{id}/unsubscribe:
    *   post:
    *     summary: Unsubscribe from a scheduled game
    *     tags: [ScheduledGames]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *     responses:
    *       200:
    *         description: Successfully unsubscribed from the game.
    */
    .post(protect, unsubscribeFromScheduledGame);

module.exports = router;