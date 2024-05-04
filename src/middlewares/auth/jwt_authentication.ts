import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { checkAndVerifyAuthentication } from "../../helper/authentication";
import { JwtPayload } from "../../types/token_types";

const debug = Debug("prisma-photos:jwt_authentication");

export const verifyJwtToken = async (req: Request, res: Response, next: NextFunction) => {
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

	if (!process.env.ACCESS_TOKEN_SECRET) {
		debug("SECRET ACCESS TOKEN missing!");
		return res.status(500).send({
			status: "error",
			message: "There is no secret access token in context"
		});
	}

	try {
		const jwt_payload = jwt.verify(jwt_token, process.env.ACCESS_TOKEN_SECRET) as unknown as JwtPayload;

		req.jwt_token = jwt_payload;
	} catch (err) {
		return res.status(401).send({
			status: "fail",
			message: "Valid authorization token is required"
		});
	}

	next();
}
