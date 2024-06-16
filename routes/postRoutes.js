/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the post, auto-generated
 *         author:
 *           type: string
 *           description: The author of the post
 *         content:
 *           type: text
 *           description: The content of the post
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the post was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the post was updated, auto-generated
 *       example:
 *         id: 1
 *         author: jlisita
 *         content: Les meilleurs tactiques de fin de partie sont ...
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express');
const { findAllPosts, findPostByPk, createPost, updatePost, deletePost } = require('../controllers/postController')
const router = express.Router();

router
    .route('/')
    /**
    * @openapi
    * /api/posts:
    *   get:
    *     summary: Get all posts
    *     tags: [Posts]
    *     responses:
    *       200:
    *         description: The list of posts.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Post'
    *       500:
    *         description: Some server error 
    */
    .get(findAllPosts)
    /**
    * @openapi
    * /api/posts:
    *   post:
    *     summary: Create a new post
    *     tags: [Post]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Post'
    *     responses:
    *       200:
    *         description: The created post.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Post'
    *       500:
    *         description: Some server error 
    */
    .post(createPost)


router
    .route('/:id')
    /**
    * @openapi
    * /api/post/{id}:
    *   get:
    *     summary: Get the post by id
    *     tags: [Posts]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The post id
    *     responses:
    *       200:
    *         description: The post response by id
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Post'
    *       404:
    *         description: The post was not found
    */
    .get(findPostByPk)
     /**
    * @openapi
    * /api/posts/{id}:
    *   put:
    *     summary: Update the post by id, restricted to admin
    *     tags: [Posts]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The Post id
    *     responses:
    *       200:
    *         description: Post updated
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Post'
    *       404:
    *         description: The post was not found
    */
     .put(updatePost)
     /**
     * @openapi
     * /api//posts/{id}:
     *   delete:
     *     summary: Delete the post by id, restricted to admin
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The post id
     *     responses:
     *       200:
     *         description: Post deleted
     *         contents:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Post'
     *       404:
     *         description: The post was not found
     */
     .delete(deletePost)

module.exports = router