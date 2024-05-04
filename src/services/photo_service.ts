import prisma from "../prisma";
import { CreatePhoto, UpdatePhoto } from "../types/photo_types";

export const getAllPhotos = async (user_id: number) => {
	return await prisma.photo.findMany({
		where: {
			user_id: user_id
		}
	});
}

export const getSinglePhoto = async (user_id: number, photo_id: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: {
			id: photo_id,
			user_id: user_id
		}
	});
}

export const getPhotoCount = async (user_id: number, album_id: number, photo_id: number) => {
	return await prisma.photo.count({
		where: {
			id: photo_id,
			user_id: user_id
		}
	});
}

export const createPhoto = async (data: CreatePhoto) => {
	return await prisma.photo.create({
		data
	});
}

export const updatePhoto = async (user_id: number, photo_id: number, data: UpdatePhoto) => {
	return await prisma.photo.update({
		where: { id: photo_id, user_id: user_id },
		data
	});
}

export const deletePhoto = async (user_id: number, photo_id: number) => {
	return await prisma.photo.delete({
		where: { id: photo_id, user_id: user_id, }
	});
}
