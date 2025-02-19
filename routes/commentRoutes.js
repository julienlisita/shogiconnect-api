/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the comment, auto-generated
 *         author:
 *           type: string
 *           description: The author of the comment
 *         content:
 *           type: text
 *           description: The content of the comment
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the comment was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the comment was updated, auto-generated
 *       example:
 *         id: 1
 *         author: jlisita
 *         content: Les meilleurs tactiques de fin de partie sont ...
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express');
const { findAllComments, findCommentByPk, createComment, updateComment, deleteComment } = require('../controllers/commentController')
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/auth');

router
    .route('/')
    /**
    * @openapi
    * /api/comments:
    *   get:
    *     summary: Get all comments
    *     tags: [Comments]
    *     responses:
    *       200:
    *         description: The list of comments.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Comment'
    *       500:
    *         description: Some server error 
    */
    .get(findAllComments)
    /**
    * @openapi
    * /api/comments:
    *   post:
    *     summary: Create a new comment
    *     tags: [Comment]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Comment'
    *     responses:
    *       200:
    *         description: The created comment.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Comment'
    *       500:
    *         description: Some server error 
    */
    .post(createComment)


router
    .route('/:id')
    /**
    * @openapi
    * /api/comment/{id}:
    *   get:
    *     summary: Get the comment by id
    *     tags: [Comment]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The comment id
    *     responses:
    *       200:
    *         description: The comment response by id
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Comment'
    *       404:
    *         description: The comment was not found
    */
    .get(findCommentByPk)
     /**
    * @openapi
    * /api/comments/{id}:
    *   put:
    *     summary: Update the comment by id, restricted to admin
    *     tags: [comments]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The comment id
    *     responses:
    *       200:
    *         description: comment updated
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Comment'
    *       404:
    *         description: The comment was not found
    */
     .put(protect, restrictTo('admin'), updateComment)
     /**
     * @openapi
     * /api/comments/{id}:
     *   delete:
     *     summary: Delete the comment by id, restricted to admin
     *     tags: [Comments]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The comment id
     *     responses:
     *       200:
     *         description: comment deleted
     *         contents:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Comment'
     *       404:
     *         description: The Comment was not found
     */
     .delete(protect, restrictTo('admin'), deleteComment)

module.exports = router