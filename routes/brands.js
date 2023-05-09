const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const brandControllers = require("../controllers/brand-controllers");

const router = express.Router();

router.post("", checkAuth, extractFile, brandControllers.createBrand);

router.put("/:id", checkAuth, extractFile, brandControllers.updateBrand);

router.get("", brandControllers.getBrands);

router.get("/brands-list", brandControllers.getBrandsList);

router.get("/:id", brandControllers.getBrandById);

router.delete("/:id", checkAuth, brandControllers.deleteBrandById);

module.exports = router;
