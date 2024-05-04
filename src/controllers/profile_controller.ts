import Debug from "debug";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getUserById, updateUser } from "../services/user_service";
import { GetUserDetails, UpdateUser, UpdateUserDetails } from "../types/user_types";
import { matchedData } from "express-validator";

const debug = Debug("prisma-photos:profile_controller");

export const getUserProfile = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error("Attempting to access authenticated user, but none exists");
	}

	const getCurrentUser = await getUserById(req.jwt_token.sub) as GetUserDetails;

	res.status(200).send({
		status: "success",
		data: {
			id: getCurrentUser.id,
			email: getCurrentUser.email,
			first_name: getCurrentUser.first_name,
			last_name: getCurrentUser.last_name
		}
	});
}

export const updateUserProfile = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error("Attempting to access authenticated user, but none exists");
	}

	const getData = matchedData(req) as UpdateUser;

	if (getData.password) {
		getData.password = await bcrypt.hash(getData.password, Number(process.env.SALT_ROUNDS) || 10);
		debug("Here is the new hashed and salted password:", getData.password);
	}

	try {
		const updateCurrentUser = await updateUser(req.jwt_token.sub, getData) as UpdateUserDetails;

		res.status(200).send({
			status: "success",
			data: {
				id: updateCurrentUser.id,
				email: updateCurrentUser.email,
				first_name: updateCurrentUser.first_name,
				last_name: updateCurrentUser.last_name
			}
		});
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				status: "error",
				message: "User not found"
			});
		} else {
			res.status(500).send({
				status: "error",
				message: "Error occured when updating a user"
			});
		}
	}
}
