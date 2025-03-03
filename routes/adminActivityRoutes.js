const express = require('express');
const {
    findAllAdminActivities,
    findAdminActivityById,
    findAdminActivityByAdminId
} = require('../controllers/adminActivityController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - userId
 *         - type
 *         - relatedType
 *         - relatedId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the activity
 *         userId:
 *           type: integer
 *           description: The ID of the admin who performed the activity
 *         type:
 *           type: string
 *           description: The type of activity (e.g., 'create', 'update', 'delete')
 *         relatedType:
 *           type: string
 *           enum: [topic, scheduledGame, comment]
 *           description: The type of entity related to the activity
 *         relatedId:
 *           type: integer
 *           description: The ID of the related entity (Topic, ScheduledGame, Comment)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the activity was recorded
 *       example:
 *         id: 1
 *         userId: 5
 *         type: "create"
 *         relatedType: "topic"
 *         relatedId: 12
 *         createdAt: "2025-02-09T12:34:56.789Z"
 */

router
    .route('/')
    /**
    * @swagger
    * /api/activities:
    *   get:
    *     summary: Retrieve all admin activities
    *     description: Fetches all activities performed by administrators.
    *     tags: [Admin Activities]
    *     responses:
    *       200:
    *         description: A list of all recorded admin activities.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Activity'
    *       500:
    *         description: Internal server error
    */
    .get(findAllAdminActivities);

router
    .route("/user/:userId")
    /**
    * @swagger
    * /api/activities/user/{userId}:
    *   get:
    *     summary: Retrieve all activities performed by a specific admin
    *     description: Fetches all recorded activities associated with a given admin user.
    *     tags: [Admin Activities]
    *     parameters:
    *       - in: path
    *         name: userId
    *         schema:
    *           type: integer
    *         required: true
    *         description: The ID of the admin whose activities are being retrieved
    *     responses:
    *       200:
    *         description: A list of activities performed by the specified admin.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Activity'
    *       404:
    *         description: No activities found for the given admin ID
    *       500:
    *         description: Internal server error
    */
    .get(findAdminActivityByAdminId);

router
    .route('/:id')
    /**
    * @swagger
    * /api/activities/{id}:
    *   get:
    *     summary: Retrieve a specific admin activity
    *     description: Fetches the details of a specific admin activity by its ID.
    *     tags: [Admin Activities]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The ID of the activity to retrieve
    *     responses:
    *       200:
    *         description: The requested admin activity.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Activity'
    *       404:
    *         description: Activity not found
    *       500:
    *         description: Internal server error
    */
    .get(findAdminActivityById);

module.exports = router;