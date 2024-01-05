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
 *         - id
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
 *     summary: Logs in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The access token for the user.
 *                 refreshToken:
 *                   type: string
 *                   description: The refresh token for the user.
 *       401:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating invalid credentials.
 */
router.post("/login", authController.login);

// registerRoute

/**
 * @swagger
 *  /auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user.
 *               password:
 *                 type: string
 *                 description: The password of the new user.
 *               email:
 *                 type: string
 *                 description: The email address of the new user.
 *               Country:
 *                 type: string
 *                 description: The country where the new user lives.
 *               latest_tracked_location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     format: double
 *                     description: The latitude of the latest tracked location.
 *                   longitude:
 *                     type: number
 *                     format: double
 *                     description: The longitude of the latest tracked location.
 *                 description: The latest tracked location of the new user.
 *               logbook:
 *                 type: string
 *                 description: Sample log entry for the new user.
 *               name:
 *                 type: string
 *                 description: The name of the new user.
 *               profile_picture:
 *                 type: string
 *                 format: uri
 *                 description: URL of the profile picture for the new user.
 *               pets:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of pets owned by the new user.
 *               address:
 *                 type: string
 *                 description: The address of the new user.
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The access token for the new user.
 *                 refreshToken:
 *                   type: string
 *                   description: The refresh token for the new user.
 *       400:
 *         description: Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the username or email already exists.
 */
router.post("/register", authController.register);

router.post("/refresh-token", authController.refreshToken);

router.get("/user/:userId/:token", authController.getUser);

router.post("/update-user", authController.updateUserData);

router.post("/profile-picture", authController.updateUserProfilePicture);

module.exports = router;
