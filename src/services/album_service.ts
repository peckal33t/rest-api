import prisma from "../prisma";
import { Photo_Id } from "../types/photo_types";
import { CreateAlbum, UpdateAlbum } from "../types/album_types";

export const getAlbums = async (user_id: number) => {
	return await prisma.album.findMany({
		where: {
			user_id: user_id
		}
	});
}

export const getSingleAlbum = async (user_id: number, album_id: number) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			id: album_id,
			user_id: user_id
		},
		include: {
			photos: true
		}
	});
}

export const getAlbumCount = async (user_id: number, album_id: number) => {
	return await prisma.album.count({
		where: {
			id: album_id,
			user_id: user_id
		}
	});
}

export const createAlbum = async (data: CreateAlbum) => {
	return await prisma.album.create({
		data,
	});
}

export const updateAlbum = async (user_id: number, album_id: number, data: UpdateAlbum) => {
	return await prisma.album.update({
		where: { id: album_id, user_id: user_id },
		data
	});
}

export const deleteAlbum = async (user_id: number, album_id: number) => {
	return await prisma.album.delete({
		where: { id: album_id, user_id: user_id }
	});
}

export const connectPhotoToAlbum = async (user_id: number, album_id: number , photo_ids: Photo_Id | Photo_Id[]) => {
	return await prisma.album.update({
		where: {
			id: album_id,
			user_id: user_id
		},
		data: {
			photos: {
				connect: photo_ids
			}
		},
		include: {
			photos: true
		}
	});
}

export const disconnectPhotoFromAlbum = async (user_id: number, album_id: number, photo_id: number) => {
		await prisma.album.update({
		where: {
			user_id: user_id,
			id: album_id
		},
		data: {
			photos: {
				disconnect:[ {
					id: photo_id
				}]
			}
		},
		select: {
			photos: true
		}
	});
}
