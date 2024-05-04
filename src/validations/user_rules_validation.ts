import { body } from "express-validator";
import { getUserByEmail } from "../services/user_service";

export const registerUserRules = [
	body("email")
	.isEmail().trim().withMessage("unique email required").bail()
	.custom(async (data) => {
		const checkUserEmail = await getUserByEmail(data);

		if (checkUserEmail) {
			throw new Error("email already in use");
		}
	}),

	body("password")
	.isString().withMessage("password needs to be a string").bail()
	.trim().isLength({ min: 6 }).withMessage("password needs to be at least 6 characters long"),

	body("first_name")
	.isString().withMessage("first_name needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("first_name needs to be at least 3 characters long"),

	body("last_name")
	.isString().withMessage("last_name needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("last_name needs to be at least 3 characters long"),
]

export const updateUserRules = [
	body("email")
	.optional().isEmail().trim().withMessage("unique email required").bail()
	.custom(async (data) => {
		const checkUserEmail = await getUserByEmail(data);

		if (checkUserEmail) {
			throw new Error("email already in use");
		}
	}),

	body("password")
	.optional().isString().withMessage("password needs to be a string").bail()
	.trim().isLength({ min: 6 }).withMessage("password needs to be at least 6 characters long"),

	body("first_name")
	.optional().isString().withMessage("first_name needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("first_name needs to be at least 3 characters long"),

	body("last_name")
	.optional().isString().withMessage("last_name needs to be a string").bail()
	.trim().isLength({ min: 3 }).withMessage("last_name needs to be at least 3 characters long")
]
