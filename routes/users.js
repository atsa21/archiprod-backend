const express = require("express");

const checkAuth = require("../middleware/check-auth");
const userController = require("../controllers/users-controller");

const router = express.Router();

router.post("/signup", userController.createUser);

router.post("/login", userController.userLogin);

router.get("", checkAuth, userController.getUsers);

module.exports = router;