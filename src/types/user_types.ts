import { User } from "@prisma/client";

export type CreateNewUser = Omit<User, "id">;

export type UpdateUser = Partial<CreateNewUser>;

export type GetUserDetails = Omit<User, "password">;

export type UpdateUserDetails = Partial<GetUserDetails>;
