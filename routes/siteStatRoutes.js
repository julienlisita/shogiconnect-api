/**
 * @swagger
 * components:
 *   schemas:
 *     SiteStats:
 *       type: object
 *       required:
 *       properties:
 *         totalUsers:
 *           type: integer
 *           description: The total number of users
 *         activeUsers:
 *           type: integer
 *           description: The number of active users
 *         totalTopics:
 *           type: integer
 *           description: The total number of topics
 *         activeTopics:
 *           type: integer
 *           description: The number of active topics
 *         totalComments:
 *           type: integer
 *           description: The total number of comments
 *         activeComments:
 *           type: integer
 *           description: The number of active comments
 *         totalScheduledGames:
 *           type: integer
 *           description: The total number of scheduled games
 *         activeScheduledGames:
 *           type: integer
 *           description: The number of active scheduled games
 *       example:
 *         totalUsers: 120
 *         activeUsers: 85
 *         totalTopics: 45
 *         activeTopics: 30
 *         totalComments: 300
 *         activeComments: 250
 *         totalScheduledGames: 75
 *         activeScheduledGames: 65
 */

const express = require('express');
const {getSiteStats} = require('../controllers/siteStatsController');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/auth')

/**
 * @openapi
 * /api/site-stats:
 *   get:
 *     summary: Get site statistics
 *     tags: [SiteStats]
 *     responses:
 *       200:
 *         description: The current site statistics.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SiteStats'
 *       500:
 *         description: Some server error 
 */
router.get('/', protect, getSiteStats);

module.exports = router;