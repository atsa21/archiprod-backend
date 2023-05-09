const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const categoryControllers = require("../controllers/category-controller");

const router = express.Router();

router.post("", checkAuth, extractFile, categoryControllers.createCategory);

router.put("/:id", checkAuth, extractFile, categoryControllers.addCategoryTypeById);

router.put("/:id/update-type", checkAuth, extractFile, categoryControllers.editTypeByName);

router.get("", categoryControllers.getCategories);

router.get("/:id", categoryControllers.getCategoryById);

module.exports = router;