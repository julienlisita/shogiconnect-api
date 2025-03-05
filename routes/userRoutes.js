/**
 * @swagger
 * components:
 *   schemas:
 *     User:  
 *       type: object
 *       required:
 *         - pseudo
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the user, auto-generated
 *         pseudo:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user (hashed)
 *         country:
 *           type: string
 *           description: The country of the user
 *         biography:
 *           type: string
 *           description: A short biography of the user
 *         ratio:
 *           type: number
 *           format: float
 *           description: The gaming rating of the user
 *         avatar:
 *           type: string
 *           description: The URL of the user's avatar image
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: The role of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was created, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was last updated, auto-generated
 *       example:
 *         id: 4
 *         pseudo: Juju
 *         email: jlisita@hotmail.fr
 *         password: efjzb565VHG
 *         country: France
 *         biography: Je suis développeur web
 *         ratio: 12.7
 *         avatar: ehfzfhefzf
 *         role: user
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express');
const { findAllUsers, findUserByPk, updateUser, deleteUser, updateProfile, getProfile, deleteProfile, updateAvatar, updateUserRole } = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/auth');
const router = express.Router();
const upload = require('../middlewares/upload');

router
    .route('/')
    /**
    * @openapi
    * /api/users:
    *   get:
    *     summary: Retrieve all users
    *     tags: [Users]
    *     responses:
    *       200:
    *         description: A list of users
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/User'
    *       500:
    *         description: Internal server error
    */
    .get(findAllUsers);

router
    .route('/me/avatar')
    /**
    * @openapi
    * /api/users/me/avatar:
    *   patch:
    *     summary: Update the avatar of the currently authenticated user
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content:
    *         multipart/form-data:
    *           schema:
    *             type: object
    *             properties:
    *               avatar:
    *                 type: string
    *                 format: binary
    *     responses:
    *       200:
    *         description: The avatar was updated successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 avatar:
    *                   type: string
    *                   description: The URL of the user's updated avatar
    *       400:
    *         description: No file was uploaded or the file type is incorrect
    *       500:
    *         description: Internal server error
    */
    .patch(protect, upload.single('avatar'), updateAvatar);

router
    .route('/me')
    /**
    * @openapi
    * /api/users/me:
    *   get:
    *     summary: Get the profile of the currently authenticated user
    *     tags: [Users]
    *     responses:
    *       200:
    *         description: The user's profile
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       404:
    *         description: The user was not found
    *       500:
    *         description: Internal server error
    */
    .get(protect, getProfile)
    /**
    * @openapi
    * /api/users/me:
    *   put:
    *     summary: Update the profile of the currently authenticated user
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     responses:
    *       200:
    *         description: The user was updated successfully
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       404:
    *         description: The user was not found
    *       500:
    *         description: Internal server error
    */
    .put(protect, updateProfile)
    /**
    * @openapi
    * /api/users/me:
    *   delete:
    *     summary: Delete the currently authenticated user's profile
    *     tags: [Users]
    *     responses:
    *       200:
    *         description: The user was deleted successfully
    *       404:
    *         description: The user was not found
    *       500:
    *         description: Internal server error
    */
    .delete(protect, deleteProfile);

router
    .route('/:id')
    /**
    * @openapi
    * /api/users/{id}:
    *   get:
    *     summary: Retrieve a user by their ID
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The ID of the user
    *     responses:
    *       200:
    *         description: The user found by ID
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       404:
    *         description: The user was not found
    */
    .get(findUserByPk)
    /**
    * @openapi
    * /api/users/{id}:
    *   put:
    *     summary: Update a user by their ID (restricted to admin)
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: integer
    *         required: true
    *         description: The ID of the user
    *     responses:
    *       200:
    *         description: The user was updated successfully
    *       404:
    *         description: The user was not found
    *       500:
    *         description: Internal server error
    */
    .put(protect, restrictTo('admin'), updateUser)
    /**
    * @openapi
    * /api/users/{id}:
    *   delete:
    *     summary: Delete a user by their ID (restricted to admin)
    *     tags: [Users]
    *     responses:
    *       200:
    *         description: The user was deleted successfully
    *       404:
    *         description: The user was not found
    *       500:
    *         description: Internal server error
    */
    .delete(protect, restrictTo('admin'), deleteUser);

router
    .route('/:id/role')
    /**
    * @openapi
    * /api/users/{id}/role:
    *   patch:
    *     summary: Update the role of a user (restricted to admin)
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The ID of the user
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               roleId:
    *                 type: integer
    *                 description: The new role ID of the user
    *     responses:
    *       200:
    *         description: The user's role was updated successfully
    *       400:
    *         description: Invalid role ID provided
    *       404:
    *         description: The user was not found
    *       500:
    *         description: Internal server error
    */
    .patch(protect, restrictTo('admin'), updateUserRole);

module.exports = router;