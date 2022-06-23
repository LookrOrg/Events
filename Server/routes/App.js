const express = require("express");
const router = express.Router();
const indexController = require("../controllers/App")

/**
 * @swagger
 * /api/checkEmail:
 *   get:
 *     summary: controlla se esiste o no l'email
 *     parameters:
 *       - in: query
 *         required: true
 *         name: email
 *         schema:
 *           type: string
 *         description: è l'email dell'utente
 *     responses:
 *       200:
 *         description: la mail esiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: No email found
 *       404:
 *         description: la mail non esiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error: 
 *                   type: string
 *                   example: email already taken
 */ 
router.get("/checkEmail", indexController.checkEmail)

/**
 * @swagger
 * /api/checkHandle:
 *   get:
 *     summary: check if a handle exist
 *     parameters:
 *       - in: query
 *         required: true
 *         name: handle
 *         schema:
 *           type: string
 *         description: this is the handle of the user, the handle start with the '@'
 *         example: '@testHandle'
 *     responses:
 *       200:
 *         description: the user already exist, the user profile is returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: user found!
 *       404:
 *         description: no user found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: user not found!    
 */
router.get("/checkHandle", indexController.checkHandle)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: login of a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: email@test.com
 *               password: 
 *                 type: string
 *                 example: Pass1234$$
 *     responses:
 *       200:
 *         description: login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: my.jwt.token 
 *       400:
 *         description: error in the password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: error in the password
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:  user not found
 */
router.post("/login", indexController.login)

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: signup of a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               handle:
 *                 type: string
 *                 example: '@foo'
 *               name:
 *                 type: string
 *                 example: foo
 *               surname:
 *                 type: string
 *                 example: foo
 *               email:
 *                 type: string
 *                 example: foo@email.com
 *               password:
 *                 type: string
 *                 example: Foo1234$$
 *                 description: min 8 char length, 1 upper case 1 lower case 1 special character
 *               confirmPassword:
 *                 type: string
 *                 description: the copy paste the password
 *                 example: Foo1234$$
 *               phone:
 *                 type: string
 *                 example: 123456789
 *               image:
 *                 type: string
 *                 example: http://stacacataèdatogliere.com
 *     responses:
 *       200:
 *         description: ritorna il jwt per l'utente appena registrato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: my.verylong.jwt
 *                   description: jwt auth for the user
 *       400:
 *         description: some error in the mail or in the password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: the password doesn't match the required parameter 
 *                   description: some error in the mail or in the password
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: internal server error 
 *                   description: internal server error
 */
router.post("/signup", indexController.signup)


module.exports = router;