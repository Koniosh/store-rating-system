const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const {
  validateStore,
  handleValidationErrors,
} = require("../utils/validation");

router.use(authenticateToken);

router.post(
  "/",
  authorizeRole(["admin"]),
  validateStore,
  handleValidationErrors,
  storeController.createStore
);
router.get("/", storeController.getStores);
router.get("/:id", storeController.getStoreById);

module.exports = router;
