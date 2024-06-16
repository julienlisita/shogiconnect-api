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
 *           description: The id of the category, auto-generated
 *         title:
 *           type: string
 *           description: The title of the category
 *         description:
 *           type: text
 *           description: The description of the category
 *       example:
 *         id: 1
 *         title: Stratégies et Tactiques
 *         description: Discutez des stratégies et des tactiques avancées du shogi, partagez vos ouvertures préférées, et analysez des parties célèbres
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express');
const { findAllCategories, findCategoryByPk, findCategoryTopics } = require('../controllers/categoryController')
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

 router   
    .route('/:id')
    /**
    * @openapi
    * /api/categories/{id}:
    *   get:
    *     summary: Get the categorie by id
    *     tags: [Categories]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The categorie id
    *     responses:
    *       200:
    *         description: The categorie response by id
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Category'
    *       404:
    *         description: The categorie was not found
    */
    .get(findCategoryByPk)

router
    .route('/:id/topics')
    .get(findCategoryTopics)

module.exports = router