import prisma from "../prisma";
import { CreateNewUser, UpdateUser } from "../types/user_types";

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email,
		}
	});
}

export const getUserById = async (id: number) => {
	return await prisma.user.findUnique({
		where: {
			id
		}
	});
}

export const createUser = async (data: CreateNewUser) => {
	return await prisma.user.create({
		data,
	});
}

export const updateUser = async (user_id: number, data: UpdateUser) => {
	return await prisma.user.update({
		where: {
			id: user_id
		},
		data
	});
}
