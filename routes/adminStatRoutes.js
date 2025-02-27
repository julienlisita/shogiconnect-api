const express = require('express');
const {
    findAllAdminStats,
    findAdminStatById,
    createAdminStat,
    updateAdminStat,
    deleteAdminStat,
} = require('../controllers/adminStatController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminStat:
 *       type: object
 *       required:
 *         - usersDeleted
 *         - topicsDeleted
 *         - commentsDeleted
 *         - scheduledGamesDeleted
 *         - adminId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the admin stat
 *         usersDeleted:
 *           type: integer
 *           description: Number of users deleted by the admin
 *         topicsDeleted:
 *           type: integer
 *           description: Number of topics deleted by the admin
 *         commentsDeleted:
 *           type: integer
 *           description: Number of comments deleted by the admin
 *         scheduledGamesDeleted:
 *           type: integer
 *           description: Number of scheduled games deleted by the admin
 *         adminId:
 *           type: integer
 *           description: The ID of the admin who performed these actions
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the admin stat was recorded
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the last update
 *       example:
 *         id: 1
 *         usersDeleted: 3
 *         topicsDeleted: 5
 *         commentsDeleted: 12
 *         scheduledGamesDeleted: 2
 *         adminId: 42
 *         createdAt: "2025-02-09T12:34:56.789Z"
 *         updatedAt: "2025-02-10T15:22:30.456Z"
 */

router
    .route('/')
    /**
    * @openapi
    * /api/admin_stats:
    *   get:
    *     summary: Get all admin stats
    *     tags: [AdminStats]
    *     responses:
    *       200:
    *         description: The list of admin stats.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/AdminStat'
    *       500:
    *         description: Some server error 
    */
    .get(findAllAdminStats)
    /**
    * @openapi
    * /api/admin_stats:
    *   post:
    *     summary: Create a new admin stat
    *     tags: [AdminStats]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/AdminStat'
    *     responses:
    *       201:
    *         description: The created admin stat.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/AdminStat'
    *       400:
    *         description: Invalid admin ID
    *       500:
    *         description: Some server error 
    */
    .post(createAdminStat);

router
    .route('/:id')
    /**
    * @openapi
    * /api/admin_stats/{id}:
    *   get:
    *     summary: Get an admin stat by ID
    *     tags: [AdminStats]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The admin stat ID
    *     responses:
    *       200:
    *         description: The admin stat response by ID
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/AdminStat'
    *       404:
    *         description: The admin stat was not found
    */
    .get(findAdminStatById)
    /**
    * @openapi
    * /api/admin_stats/{id}:
    *   put:
    *     summary: Update an admin stat by ID
    *     tags: [AdminStats]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The admin stat ID
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/AdminStat'
    *     responses:
    *       200:
    *         description: Admin stat updated
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/AdminStat'
    *       404:
    *         description: The admin stat was not found
    */
    .put(updateAdminStat)
    /**
    * @openapi
    * /api/admin_stats/{id}:
    *   delete:
    *     summary: Delete an admin stat by ID
    *     tags: [AdminStats]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The admin stat ID
    *     responses:
    *       200:
    *         description: Admin stat deleted
    *       404:
    *         description: The admin stat was not found
    */
    .delete(deleteAdminStat);

module.exports = router;