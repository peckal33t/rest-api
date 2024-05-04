import { body } from "express-validator";

export const addAlbumRules = [
	body("title")
	.isString().withMessage("title needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("title needs to be at least 3 characters long")
]

export const updateAlbumRules = [
	body("title")
	.isString().withMessage("title needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("title needs to be at least 3 characters long")
]
