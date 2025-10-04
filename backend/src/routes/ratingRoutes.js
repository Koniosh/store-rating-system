const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const { authenticateToken } = require("../middleware/auth");
const {
  validateRating,
  handleValidationErrors,
} = require("../utils/validation");

router.use(authenticateToken);

router.post(
  "/:storeId",
  validateRating,
  handleValidationErrors,
  ratingController.submitRating
);
router.put(
  "/:storeId",
  validateRating,
  handleValidationErrors,
  ratingController.updateRating
);
router.get("/store/:storeId/users", ratingController.getRatingsByStore);

module.exports = router;
