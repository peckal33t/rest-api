import Debug from "debug";
import { Request, Response } from "express";
import {
	connectPhotoToAlbum,
	createAlbum,
	deleteAlbum,
	disconnectPhotoFromAlbum,
	getAlbumCount,
	getAlbums,
	getSingleAlbum,
	updateAlbum,
} from "../services/album_service";
import { matchedData } from "express-validator";
import { CreateAlbum, UpdateAlbum } from "../types/album_types";
import {
	getAllPhotos,
	getPhotoCount,
	getSinglePhoto,
	updatePhoto,
} from "../services/photo_service";

const debug = Debug("prisma-photos:album_controller");

export const index = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const getUserAlbums = req.jwt_token.sub;

	if (!getUserAlbums) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const get_albums = await getAlbums(getUserAlbums);
		res.send({
			status: "success",
			data: get_albums,
		});
	} catch (err) {
		res.status(500).send({
			status: "error",
			message: "Error occured when getting the albums",
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

	const getUserAlbum = req.jwt_token.sub;
	const album_id = Number(req.params.album_id);

	if (!getUserAlbum) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const get_album = await getSingleAlbum(getUserAlbum, album_id);

		if (get_album.user_id !== getUserAlbum) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this album",
			});
		} else {
			res.send({
				status: "success",
				data: get_album,
			});
		}
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				status: "error",
				message: "Album Not Found",
			});
		} else {
			res.status(500).send({
				status: "error",
				message: "Error occured when getting a single album",
			});
		}
	}
};

export const store = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const user_id = req.jwt_token.sub;
	const getMatchedData = matchedData(req) as CreateAlbum;
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
		const create_album = await createAlbum(allData);

		if (create_album.user_id !== user_id) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this album",
			});
		} else {
			res.status(201).send({
				status: "success",
				data: create_album,
			});
		}
	} catch (err) {
		res.status(500).send({
			message: "Error occured when creating an album",
		});
	}
};

export const update = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const updateUserAlbum = req.jwt_token.sub;
	const album_id = Number(req.params.album_id);

	const getMatchedData = matchedData(req) as UpdateAlbum;

	if (!updateUserAlbum) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const update_album = await updateAlbum(
			updateUserAlbum,
			album_id,
			getMatchedData
		);

		if (update_album.user_id !== updateUserAlbum) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this album",
			});
		} else {
			res.status(200).send({
				status: "success",
				data: update_album,
			});
		}
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				status: "error",
				message: "Album Not Found",
			});
		} else {
			res.status(500).send({
				status: "error",
				message: "Error occured when updating a single album",
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

	const deleteUserAlbum = req.jwt_token.sub;
	const album_id = Number(req.params.album_id);

	if (!deleteUserAlbum) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const album = await deleteAlbum(deleteUserAlbum, album_id);

		if (album.user_id !== deleteUserAlbum) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this album",
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
				message: "Album Not Found",
			});
		} else {
			res.status(500).send({
				status: "error",
				message: "Error occured when deleting an album",
			});
		}
	}
};

export const addPhotoToAlbum = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const connectUserPhoto = req.jwt_token.sub;
	const album_id = Number(req.params.album_id);
	const photo_id = req.body.id;

	const albumCount = await getAlbumCount(connectUserPhoto, album_id);

	if (!connectUserPhoto) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const requestedPhotoIds = req.body;
		const photos = await getAllPhotos(connectUserPhoto);
		if (Array.isArray(req.body)) {
			for (let i = 0; i < requestedPhotoIds.length; i++) {
				const photo = requestedPhotoIds[i];
				const thePhoto = photos.find((p) => p.id === photo.id);
				if (!thePhoto) {
					return res.status(404).send({
						status: "error",
						message: "Photo's Not Found",
					});
				}
			}
		} else {
			const photo = await getSinglePhoto(connectUserPhoto, photo_id);
			if (photo.user_id !== connectUserPhoto) {
				return res.status(404).send({
					status: "error",
					message: "Photo Not Found",
				});
			}
		}

		const add_photo = await connectPhotoToAlbum(
			connectUserPhoto,
			album_id,
			req.body
		);

		if (add_photo.user_id !== connectUserPhoto) {
			return res.status(401).send({
				status: "fail",
				message: "You are not authenticated to this album",
			});
		} else {
			res.status(201).send({
				status: "success",
				data: add_photo,
			});
		}
	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({
				status: "error",
				message: "Photo Not Found",
			});
		} else if (albumCount === 0) {
			res.status(404).send({
				status: "error",
				message: "Album Not Found",
			});
		} else {
			res.status(500).send({
				status: "error",
				message: "Error occured when connecting a photo to an album",
			});
		}
	}
};

export const removePhotoFromAlbum = async (req: Request, res: Response) => {
	if (!req.jwt_token) {
		debug("You cannot do this hehe!");
		throw new Error(
			"Attempting to access authenticated user, but none exists"
		);
	}

	const user = req.jwt_token.sub;
	const album_id = Number(req.params.album_id);
	const photo_id = Number(req.params.photo_id);

	if (!user) {
		return res.status(401).send({
			status: "fail",
			message: "You are not authenticated",
		});
	}

	try {
		const albumCount = await getAlbumCount(user, album_id);
		if (albumCount === 0) {
			return res.status(404).send({
				status: "error",
				message: "Album Not Found",
			});
		}

		const album = await getSingleAlbum(user, album_id);
		if (!album.photos.find((p) => p.id === photo_id)) {
			return res.status(404).send({
				status: "error",
				message: "Photo Not Found",
			});
		}
		// await deletePhoto(user, photo_id);
		await disconnectPhotoFromAlbum(user, album_id, photo_id);

		return res.status(200).send({
			status: "success",
			data: null,
		});
	} catch (err) {
		res.status(500).send({
			status: "error",
			message: "Error occured when disconnecting a photo from an album",
		});
	}
};
