const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateUser, handleValidationErrors } = require("../utils/validation");
const { authenticateToken } = require("../middleware/auth"); // Add this import

router.post(
  "/signup",
  validateUser,
  handleValidationErrors,
  authController.signup
);
router.post("/login", authController.login);
router.put(
  "/change-password",
  authenticateToken,
  authController.changePassword
); // Add authenticateToken middleware

module.exports = router;
