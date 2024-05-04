import express from "express";
import * as profileController from "../controllers/profile_controller";
import validateIncomingRequest from "../middlewares/validation";
import { updateUserRules } from "../validations/user_rules_validation";

const router = express.Router();

/**
 * GET /profile
 */
router.get("/", profileController.getUserProfile);

/**
 * PATCH /profile
 */
router.patch("/", updateUserRules, validateIncomingRequest, profileController.updateUserProfile)

export default router;
