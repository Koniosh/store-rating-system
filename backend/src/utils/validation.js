const { body, validationResult } = require("express-validator");

const validateUser = [
  body("name")
    .trim()
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be between 20 and 60 characters"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must contain at least one uppercase letter and one special character"
    ),
  body("address")
    .optional()
    .trim()
    .isLength({ max: 400 })
    .withMessage("Address must not exceed 400 characters"),
];

const validateStore = [
  body("name")
    .trim()
    .isLength({ min: 20, max: 60 })
    .withMessage("Store name must be between 20 and 60 characters"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email format"),
  body("address")
    .optional()
    .trim()
    .isLength({ max: 400 })
    .withMessage("Address must not exceed 400 characters"),
];

const validateRating = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUser,
  validateStore,
  validateRating,
  handleValidationErrors,
};
