import { body } from "express-validator";

export const createLoginRules = [
	body("email")
	.isString().withMessage("email needs to be a string").isEmail().withMessage("unique email required").trim(),

	body("password")
	.isString().withMessage("password needs to be a string").bail()
	.trim().isLength({ min: 6 }).withMessage("password needs to be at least 6 characters long")
]
