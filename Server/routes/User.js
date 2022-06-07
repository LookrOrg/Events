const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const auth = require("../utils/Auth")

router.use(auth)

//restituisce utente loggato
router.get("/", userController.getUserAuth)
router.get("/user/:handle")
module.exports = router;
