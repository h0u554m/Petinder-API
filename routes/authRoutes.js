const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a user
 *         userName:
 *           type: integer
 *           description: Unique name for a user
 *         password:
 *           type: string
 *           description: hashed password
 *         email:
 *           type: string
 *           description: user email 
 *         country:
 *           type: string
 *           description: Country where user lives
 *         latest_tracked_location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               format: double
 *               description: The latitude of the latest tracked location
 *             longitude:
 *               type: number
 *               format: double
 *               description: The longitude of the latest tracked location
 *           description: The user's latest tracked location
 *         logbook:
 *           type: string
 *           description: Sample log entry
 *         name:
 *           type: string
 *           description: User's name
 *         profile_picture:
 *           type: string
 *           format: uri
 *           description: URL of the user's profile picture
 *         pets:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of pets owned by the user
 *         address:
 *           type: string
 *           description: User's address
 *       example:
 *         username: john_doe
 *         password: 1
 *         email: john.doe@example.com
 *         country: United States
 *         latest_tracked_location:
 *           latitude: 37.7749
 *           longitude: -122.4194
 *         logbook: Sample log entry
 *         name: John Doe
 *         profile_picture: https://example.com/profile.jpg
 *         pets: ["Dog", "Cat"]
 *         address: 123 Main Street, Cityville
 */

/**
 * @swagger
 *  /auth/login:
 *   post:
 *     summary: Returns logged in user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login a user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post("/login", authController.login);

/**
 * @swagger
 *  /auth/register:
 *   post:
 *     summary: Returns registered user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post("/register", authController.register);

module.exports = router;
