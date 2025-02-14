// authRoutes.js

/**
 * @swagger
 * components:
 *   schemas:
 *     Shogi:
 *       type: object
 *       required:
 *         - pseudo
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the user, auto-generated
 *         pseudo:
 *           type: string
 *           description: The pseudo of the user
 *         email:
 *           type: string
 *           description: The e-mail of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated, auto-generated
 *       example:
 *         id: 4
 *         pseudo: Juju
 *         email: jlisita@hotmail.fr
 *         password: efjzb565VHG
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express');
const { login, logout, checkAuth, signup, changePassword } = require('../controllers/authController');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/auth');

router
.route('/login')
/**
* @openapi
* /api/auth/login:
*   post:
*     summary: Login as user
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: Login successful.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Invalid credentials.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       500:
*         description: Some server error 
*/
.post(login)

router
.route('/logout')
/**
* @openapi
* /api/auth/logout:
*   post:
*     summary: Logout
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: Logout successful.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
.post(logout)

router
.route('/check')
/**
* @openapi
* /api/auth/check:
*   post:
*     summary: check token athentification
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: authentification successful.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
.post(checkAuth)

router
.route('/signup')
/**
* @openapi
* /api/auth/check:
*   post:
*     summary: check token athentification
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: authentification successful.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
.post(signup)

router
  .route('/change-password')
  /**
   * @openapi
   * /api/auth/change-password:
   *   patch:
   *     summary: Change the user's password
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - oldPassword
   *               - newPassword
   *             properties:
   *               oldPassword:
   *                 type: string
   *                 description: The current password of the user
   *               newPassword:
   *                 type: string
   *                 description: The new password
   *     responses:
   *       200:
   *         description: Password changed successfully.
   *       400:
   *         description: Old password incorrect or missing fields.
   *       500:
   *         description: Server error.
   */
  .patch(protect, changePassword);

module.exports = router