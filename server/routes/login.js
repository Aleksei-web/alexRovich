const express = require("express");
const AuthController = require("../controllesr/auth");

const router = express.Router();

router.post("/register", AuthController.createrUser);
router.get("/users", AuthController.getUsers);
router.post("/login", AuthController.login);

router.get("/logout", AuthController.logout);

// router.get('/feetback', FeetbackController.getFeedback);

// router.get('/feetbacktest', FeetbackController.getFeedbackTest);

module.exports = router;
