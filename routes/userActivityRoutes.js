const express = require('express');
const {
    findAllUserActivities,
    findUserActivityById,
    findUserActivityByUserId,
} = require('../controllers/userActivityController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserActivity:
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
 *           description: The ID of the user who performed the activity
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
    * /api/userActivities:
    *   get:
    *     summary: Retrieve all user activities
    *     description: Fetches all activities performed by users.
    *     tags: [User Activities]
    *     responses:
    *       200:
    *         description: A list of all recorded user activities.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/UserActivity'
    *       500:
    *         description: Internal server error
    */
    .get(findAllUserActivities);

router
    .route('/user/:userId')
    /**
    * @swagger
    * /api/userActivities/user/{userId}:
    *   get:
    *     summary: Retrieve activities of a specific user
    *     description: Fetches all activities performed by a specific user, identified by their user ID.
    *     tags: [User Activities]
    *     parameters:
    *       - in: path
    *         name: userId
    *         schema:
    *           type: integer
    *         required: true
    *         description: The ID of the user whose activities are to be retrieved
    *     responses:
    *       200:
    *         description: A list of activities performed by the specified user.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/UserActivity'
    *       404:
    *         description: No activities found for the user
    *       500:
    *         description: Internal server error
    */
    .get(findUserActivityByUserId);

router
    .route('/:id')
    /**
    * @swagger
    * /api/userActivities/{id}:
    *   get:
    *     summary: Retrieve a specific user activity
    *     description: Fetches the details of a specific user activity by its ID.
    *     tags: [User Activities]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The ID of the user activity to retrieve
    *     responses:
    *       200:
    *         description: The requested user activity.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/UserActivity'
    *       404:
    *         description: Activity not found
    *       500:
    *         description: Internal server error
    */
    .get(findUserActivityById);


module.exports = router;