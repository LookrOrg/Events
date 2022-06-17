const express = require("express");
const router = express.Router();
const indexController = require("../controllers/App")


/**
 * @swagger
 * /checkEmail:
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



router.get("/checkHandle", indexController.checkHandle)

router.post("/login", indexController.login)
router.post("/signup", indexController.signup)


module.exports = router;