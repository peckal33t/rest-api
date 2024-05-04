import { JwtPayload } from "../token_types";

declare global {
	namespace Express {
		export interface Request {
			jwt_token?: JwtPayload
		}
	}
}
