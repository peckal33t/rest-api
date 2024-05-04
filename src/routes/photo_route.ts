import express from "express";
import * as photoController from "../controllers/photo_controller";
import { addPhotoRules, updatePhotoRules } from "../validations/photo_rules_validation";
import validateIncomingRequest from "../middlewares/validation";

const router = express.Router();

/**
 * GET /photos
 */
router.get("/", photoController.index);

/**
 * GET /photos/:photo_id
 */
router.get("/:photo_id", photoController.show);

/**
 * POST /photos
 */
router.post("/", addPhotoRules, validateIncomingRequest, photoController.store);

/**
 * PATCH /photos/:photo_id
 */
router.patch("/:photo_id", updatePhotoRules, validateIncomingRequest, photoController.update);

/**
 * DELETE /photos/:photo_id
 */
router.delete("/:photo_id", photoController.destroy);

export default router;
