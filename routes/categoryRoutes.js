/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the user, auto-generated
 *         title:
 *           type: string
 *           description: The title of the category
 *         description:
 *           type: text
 *           description: The description of the category
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated, auto-generated
 *       example:
 *         id: 1
 *         title: Stratégies et Tactiques
 *         description: Discutez des stratégies et des tactiques avancées du shogi, partagez vos ouvertures préférées, et analysez des parties célèbres
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express');
const { findAllCategories } = require('../controllers/categoryController')
const router = express.Router();

router
    .route('/')
    /**
    * @openapi
    * /api/categories:
    *   get:
    *     summary: Get all categories
    *     tags: [Categories]
    *     responses:
    *       200:
    *         description: The list of categories.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Category'
    *       500:
    *         description: Some server error 
    */
    .get(findAllCategories)


module.exports = router