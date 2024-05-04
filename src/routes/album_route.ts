import express from "express";
import * as albumController from "../controllers/album_controller";
import validateIncomingRequest from "../middlewares/validation";
import { addAlbumRules, updateAlbumRules } from "../validations/album_rules_validation";

const router = express.Router();

/**
 * GET /albums
 */
router.get("/", albumController.index);

/**
 * GET /albums/:album_id
 */
router.get("/:album_id", albumController.show);

/**
 * POST /albums
 */
router.post("/", addAlbumRules, validateIncomingRequest, albumController.store);

/**
 * PATCH /albums/:album_id
 */
router.patch("/:album_id", updateAlbumRules, validateIncomingRequest, albumController.update);

/**
 * DELETE /albums/:album_id
 */
router.delete("/:album_id", albumController.destroy);

/**
 * POST /albums/:album_id/photos
 */
router.post("/:album_id/photos", albumController.addPhotoToAlbum);

/**
 * DELETE /albums/:album_id/photos/:photo_id
 */
router.delete("/:album_id/photos/:photo_id", albumController.removePhotoFromAlbum);

export default router;
