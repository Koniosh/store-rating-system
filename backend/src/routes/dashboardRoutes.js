const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

router.use(authenticateToken);

router.get(
  "/admin-stats",
  authorizeRole(["admin"]),
  dashboardController.getAdminStats
);
router.get(
  "/store-owner-stats",
  authorizeRole(["normal"]),
  dashboardController.getStoreOwnerStats
);
router.delete(
  "/clear-database",
  authorizeRole(["admin"]),
  dashboardController.clearDatabase
); // Add this

module.exports = router;
