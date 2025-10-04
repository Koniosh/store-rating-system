const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const { validateUser, handleValidationErrors } = require("../utils/validation");

router.use(authenticateToken);

// Admin routes
router.post(
  "/",
  authorizeRole(["admin"]),
  validateUser,
  handleValidationErrors,
  userController.createUser
);
router.get("/", authorizeRole(["admin"]), userController.getUsers);
router.get("/:id", authorizeRole(["admin"]), userController.getUserById);

module.exports = router;
