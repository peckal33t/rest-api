import bcrypt from "bcrypt";
import Debug from "debug";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { createUser, getUserByEmail, getUserById } from "../services/user_service";
import { CreateNewUser } from "../types/user_types";
import { RequestLogin } from "../helper/login_user_helper";
import { JwtPayload, JwtRefreshPayload } from "../types/token_types";
import { checkAndVerifyAuthentication } from "../helper/authentication";

const debug = Debug("prisma-photos:user_controller");

export const registerUser = async (req: Request, res: Response) => {
	const verifiedData = matchedData(req);
	debug("verifiedData: %O", verifiedData);

	const hash_password = await bcrypt.hash(verifiedData.password, Number(process.env.SALT_ROUNDS) || 10);
	debug("Here is the hashed password:", hash_password);

	const userData = { ...verifiedData, password: hash_password } as CreateNewUser;

	try {
		const createNewUser = await createUser(userData) as CreateNewUser;

		res.status(201).send({
			status: "success",
			data: {
				email: createNewUser.email,
				first_name: createNewUser.first_name,
				last_name: createNewUser.last_name
			}
		});
	} catch (err) {
		debug("Could not successfully create a user: %O", err);
		return res.status(500).send({
			status: "error",
			message: "Could not successfully create a user"
		})
	}
}

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body as RequestLogin;

	const find_user = await getUserByEmail(email);

	if (!find_user) {
		debug(`User with email ${email} does not exist.`);
		return res.status(401).send({
			status: "fail",
			message: `User with email - ${email} does not exist.`
		});
	}

	const check_user_password = await bcrypt.compare(password, find_user.password);

	if (!check_user_password) {
		debug("Incorrect password for: %O", email);
		return res.status(401).send({
			status: "fail",
			message: `Incorrect password for user with email - ${email}`
		});
	}

	const jwt_payload: JwtPayload = {
		sub: find_user.id,
		email: find_user.email,
		name: find_user.first_name
	}

	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "Access secret token is missing"
		});
	}

	const access_token = jwt.sign(jwt_payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h"
	});

	const jwt_refresh_payload: JwtRefreshPayload = {
		sub: find_user.id
	}

	if (!process.env.REFRESH_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "Refresh secret token is missing"
		});
	}

	const refresh_token = jwt.sign(jwt_refresh_payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "1d"
	});

	res.send({ status: "success", data: {
		access_token, refresh_token
	} });
}

export const refreshUserToken = async (req: Request, res: Response) => {
	let jwt_token: string

	try {
		jwt_token = checkAndVerifyAuthentication(req, "Bearer");
	} catch (err) {
		if (err) {
			return res.status(401).send({
				status: "fail",
				message: "Valid authorization token is required"
			});
		}
			return res.status(401).send({
				status: "fail",
				message: "Unrecognizable authorization"
			});
	}

	if (!process.env.REFRESH_TOKEN_SECRET) {
		debug("SECRET REFRESH TOKEN missing!");
		return res.status(500).send({
			status: "error",
			message: "There is no secret refresh token in context"
		});
	}

	try {
		const jwtRefreshPayload = jwt.verify(jwt_token, process.env.REFRESH_TOKEN_SECRET) as unknown as JwtRefreshPayload;

		const getUser = await getUserById(jwtRefreshPayload.sub);

		if (!getUser) {
			return res.status(500).send({
				status: "error",
				message: "Prohibited access"
			});
		}

		const jwt_payload: JwtPayload = {
			sub: getUser.id,
			email: getUser.email,
			name: getUser.first_name
		}

		if (!process.env.ACCESS_TOKEN_SECRET) {
			debug("TOKEN IS MISSING! 02-18");
			return res.status(500).send({
				status: "error",
				message: "Access secret token is missing"
			});
		}

		const access_token = jwt.sign(jwt_payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h"
		});

		res.send({ status: "success", data: { access_token } });

	} catch (err) {
		return res.status(401).send({
			status: "fail",
			message: "Valid authorization token is required"
		});
	}
}
