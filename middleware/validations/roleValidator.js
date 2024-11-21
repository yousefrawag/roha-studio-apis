const { body } = require("express-validator");

exports.insert = [
  body("name")
    .isString()
    .withMessage("name should be a string")
    .notEmpty()
    .withMessage("name is required"),
  body("permissions").isArray().withMessage("permission is an array"),
  body("permissions.*").isString().withMessage("permissions values is string"),
];

exports.update = [
  body("name")
    .optional()
    .isString()
    .withMessage("name should be a string")
    .notEmpty()
    .withMessage("name is required"),
  body("permissions")
    .optional()
    .isArray()
    .withMessage("permission is an array"),
  body("permissions.*")
    .optional()
    .isString()
    .withMessage("permissions values is string"),
];
