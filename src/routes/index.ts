/**
 * Main application routes
 */
import express from "express";
import { loginUser, refreshUserToken, registerUser } from "../controllers/user_controller";
import photoRoutes from "./photo_route";
import albumRoutes from "./album_route";
import profileRoutes from "./profile_route";
import validateIncomingRequest from "../middlewares/validation";
import { registerUserRules } from "../validations/user_rules_validation";
import { createLoginRules } from "../validations/login_rules_validation";
import { verifyJwtToken } from "../middlewares/auth/jwt_authentication";

const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "API Owned by: Petar",
	});
});

/**
 * Register new user
 */
router.post("/register", registerUserRules, validateIncomingRequest, registerUser);

/**
 * /photos
 */
router.use("/photos", verifyJwtToken, photoRoutes);

/**
 * /albums
 */
router.use("/albums", verifyJwtToken, albumRoutes);

/**
 * Log in user
 */
router.post("/login", createLoginRules, validateIncomingRequest, loginUser);

/**
 * Generate refresh token
 */
router.post("/refresh", refreshUserToken);

/**
 * /profile
 */
router.use("/profile", verifyJwtToken, profileRoutes);

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: "Not Found",
	});
});

export default router;
