import { body } from "express-validator";

export const addPhotoRules = [
	body("title")
	.isString().withMessage("title needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("title needs to be at least 3 characters long"),

	body("url")
	.isString().withMessage("url needs to be a string").bail().trim()
	.isURL().withMessage("unique url is required").bail().trim(),

	body("comment")
	.optional().isString().isLength({ min: 3 })
	.withMessage("comment needs to be at least 3 characters long")
]

export const updatePhotoRules = [
	body("title")
	.optional().isString().withMessage("title needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("title needs to be at least 3 characters long"),

	body("url")
	.optional().isString().withMessage("url needs to be a string").bail()
	.trim().isURL().withMessage("unique url is required"),

	body("comment")
	.optional().isString().withMessage("comment needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("comment needs to be at least 3 characters long"),
]
