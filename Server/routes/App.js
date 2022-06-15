const express = require("express");
const router = express.Router();
const indexController = require("../controllers/App")

//TODO: Cambia il posto dov'è la mail (da body a query)
router.get("/checkEmail", indexController.checkEmail)
router.get("/checkHandle", indexController.checkHandle)

router.post("/login", indexController.login)
router.post("/signup", indexController.signup)


module.exports = router;