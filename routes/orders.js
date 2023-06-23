const express = require("express");

const orderControllers = require("../controllers/order-controller");

const router = express.Router();

router.post("", orderControllers.addOrder);

module.exports = router;