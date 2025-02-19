/**
 * @swagger
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the topic, auto-generated
 *         title:
 *           type: string
 *           description: The title of the topic
 *         author:
 *           type: string
 *           description: The author of the topic
 *         content:
 *           type: text
 *           description: The content of the topic
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the topic was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the topic was updated, auto-generated
 *       example:
 *         id: 1
 *         title: Tactiques de fin de partie
 *         author: jlisita
 *         content: Quelles sont les meilleurs tactiques de fin de partie.
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express');
const { findAllTopics, findTopicByPk, findTopicComments, createTopic, updateTopic, deleteTopic } = require('../controllers/topicController')
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/auth')

router
    .route('/')
    /**
    * @openapi
    * /api/topics:
    *   get:
    *     summary: Get all topics
    *     tags: [Topics]
    *     responses:
    *       200:
    *         description: The list of topics.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Topic'
    *       500:
    *         description: Some server error 
    */
    .get(findAllTopics)
    /**
    * @openapi
    * /api/topics:
    *   Comment:
    *     summary: Create a new topic
    *     tags: [Topic]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Topic'
    *     responses:
    *       200:
    *         description: The created topic.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Topic'
    *       500:
    *         description: Some server error 
    */
    .post(createTopic)


router
    .route('/:id')
    /**
    * @openapi
    * /api/topic/{id}:
    *   get:
    *     summary: Get the topic by id
    *     tags: [Topics]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The topic id
    *     responses:
    *       200:
    *         description: The topic response by id
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Topic'
    *       404:
    *         description: The topic was not found
    */
    .get(findTopicByPk)
     /**
    * @openapi
    * /api/topics/{id}:
    *   put:
    *     summary: Update the topic by id, restricted to admin
    *     tags: [Topics]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The topic id
    *     responses:
    *       200:
    *         description: User updated
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Topic'
    *       404:
    *         description: The topic was not found
    */
     .put(protect, restrictTo('admin'), updateTopic)
     /**
     * @openapi
     * /api/topics/{id}:
     *   delete:
     *     summary: Delete the topic by id, restricted to admin
     *     tags: [Topics]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The topic id
     *     responses:
     *       200:
     *         description: Topic deleted
     *         contents:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Topic'
     *       404:
     *         description: The topic was not found
     */
     .delete(protect, restrictTo('admin'), deleteTopic)

router
    .route('/:id/comments')
    .get(findTopicComments)

module.exports = router