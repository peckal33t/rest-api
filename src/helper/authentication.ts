import Debug from "debug";
import { Request } from "express";

const debug = Debug("prisma-photos:authentication")

type AllowedAuthentication = "Bearer";

export const checkAndVerifyAuthentication = (req: Request, awaitedType: AllowedAuthentication) => {
	if (!req.headers.authorization) {
		debug("Missed authorization header:", checkAndVerifyAuthentication);
		throw new Error("Allowed authorization header missing");
	}

	const [authorizationHeader, payload] = req.headers.authorization.split(" ");

	if (authorizationHeader !== awaitedType) {
		debug("Authorization header is not of the valid type:", awaitedType);
		throw new Error("Authorization is not Bearer");
	}

	return payload;
}
