import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validateIncomingRequest = (req: Request, res: Response, next: NextFunction) => {
	const validationError = validationResult(req);

	if (!validationError.isEmpty()) {
		res.status(400).send({ status: "fail", data: validationError.array()});
		return;
	}

	next();
}

export default validateIncomingRequest
