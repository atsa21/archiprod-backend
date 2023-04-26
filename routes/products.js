const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const productControllers = require("../controllers/products-controller");

const router = express.Router();

router.post("", checkAuth, extractFile, productControllers.createProduct);

router.put("/:id", checkAuth, extractFile, productControllers.updateProduct);

router.get("", productControllers.getProducts);

router.get("/isOnSale", productControllers.getProductsOnSale);

router.get("/:id", productControllers.getProductById);

router.delete("/:id", checkAuth, productControllers.deleteProductById);

module.exports = router;