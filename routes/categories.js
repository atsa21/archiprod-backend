const express = require("express");

const checkAuth = require("../middleware/check-auth");
const categoryControllers = require("../controllers/category-controller");

const router = express.Router();

router.post("", checkAuth, categoryControllers.createCategory);

router.put("/:id", checkAuth, categoryControllers.addCategoryTypeById);

router.put("/:id/update-type", checkAuth, categoryControllers.editTypeByName);

router.get("", categoryControllers.getCategories);

router.get("/:id", categoryControllers.getCategoryById);

module.exports = router;