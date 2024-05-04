import Debug from "debug";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import {
	createPhoto,
	deletePhoto,
	getAllPhotos,
	getSinglePhoto,
	updatePhoto,
} from "../services/photo_service";
import { CreatePhoto, UpdatePhoto } from "../types/photo_types";

const debug = Debug("prisma-photos:photo_controller");

export const index = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const getUserPhotos = req.jwt_token.sub;

	if (!getUserPhotos) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const get_photos = await getAllPhotos(getUserPhotos);
		res.send({
			status: "success",
			data: get_photos,
		});
	} catch (err) {
		debug("Error getting all photos: %O", err);
		res.status(500).send({
			status: "error",
			message: "Error occured when getting the photos",
		});
	}
};

export const show = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const getUserPhoto = req.jwt_token.sub;
	const photo_id = Number(req.params.photo_id);

	if (!getUserPhoto) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const get_photo = await getSinglePhoto(getUserPhoto, photo_id);

		if (get_photo.user_id !== getUserPhoto) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this photo",
			});
		} else {
			res.send({
				status: "success",
				data: get_photo,
			});
		}
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				status: "error",
				message: "Photo Not Found",
			});
		} else {
			res.status(500).send({
				status: "error",
				message: "Error occured when getting a single photo",
			});
		}
	}
};

export const store = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!: %O");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const user_id = req.jwt_token.sub;
	const getMatchedData = matchedData(req) as CreatePhoto;
	const allData = {
		...getMatchedData,
		user_id,
	};

	if (!user_id) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const create_photo = (await createPhoto(allData)) as CreatePhoto;

		if (create_photo.user_id !== user_id) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this photo",
			});
		} else {
			res.status(201).send({
				status: "success",
				data: create_photo,
			});
		}
	} catch (err: any) {
		if (err.code === "P2016") {
			res.status(404).send({
				status: "error",
				message: "Photo with chosen ID Not Found",
			});
		} else {
			res.status(500).send({
				status: "error",
				message: "Error occured when creating a photo",
			});
		}
	}
};

export const update = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const updateUserPhoto = req.jwt_token.sub;
	const photo_id = Number(req.params.photo_id);

	const getMatchedData = matchedData(req) as UpdatePhoto;

	if (!updateUserPhoto) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const update_photo = await updatePhoto(
			updateUserPhoto,
			photo_id,
			getMatchedData
		);

		if (update_photo.user_id !== updateUserPhoto) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this photo",
			});
		} else {
			res.status(200).send({
				status: "success",
				data: update_photo,
			});
		}
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				status: "error",
				message: "Photo Not Found",
			});
		} else {
			res.status(500).send({
				message: "Error occured when updating a photo",
			});
		}
	}
};

export const destroy = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const deleteUserPhoto = req.jwt_token.sub;
	const photo_id = Number(req.params.photo_id);

	if (!deleteUserPhoto) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const photo = await deletePhoto(deleteUserPhoto, photo_id);

		if (photo.user_id !== deleteUserPhoto) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this photo",
			});
		} else {
			res.status(200).send({
				status: "success",
				data: null,
			});
		}
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				status: "error",
				message: "Photo Not Found",
			});
		} else {
			res.status(500).send({
				status: "error",
				message: "Error occured when deleting a photo",
			});
		}
	}
};
