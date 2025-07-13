const express = require("express");
const { register, login } = require("../controllers/userController.js");
const { currentUser } = require("../controllers/userController.js");
const { isAuthorized } = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", isAuthorized, currentUser);

module.exports = router;
