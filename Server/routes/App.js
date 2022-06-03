const express = require("express");
const router = express.Router();
const indexController = require("../controllers/App")

router.post("/login", indexController.login)
router.post("/signup", indexController.signup)
router.post("/checkHandle", indexController.checkHandle)

module.exports = router;