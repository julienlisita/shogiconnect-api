const express = require('express');
const {
    findAllActivities,
    findActivityById,
    createActivity,
    deleteActivity
} = require('../controllers/userActivityController');

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
    * @openapi
    * /api/activities:
    *   get:
    *     summary: Get all activities
    *     tags: [Activities]
    *     responses:
    *       200:
    *         description: The list of activities.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Activity'
    *       500:
    *         description: Some server error 
    */
    .get(findAllActivities)
    /**
    * @openapi
    * /api/activities:
    *   post:
    *     summary: Create a new activity
    *     tags: [Activities]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Activity'
    *     responses:
    *       201:
    *         description: The created activity.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Activity'
    *       500:
    *         description: Some server error 
    */
    .post(createActivity);

router
    .route('/:id')
    /**
    * @openapi
    * /api/activities/{id}:
    *   get:
    *     summary: Get an activity by ID
    *     tags: [Activities]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The activity ID
    *     responses:
    *       200:
    *         description: The activity response by ID
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Activity'
    *       404:
    *         description: The activity was not found
    */
    .get(findActivityById)
    /**
    * @openapi
    * /api/activities/{id}:
    *   delete:
    *     summary: Delete an activity by ID
    *     tags: [Activities]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The activity ID
    *     responses:
    *       200:
    *         description: Activity deleted
    *       404:
    *         description: The activity was not found
    */
    .delete(deleteActivity);

module.exports = router;