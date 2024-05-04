import { Photo } from "@prisma/client";

export type Photo_Id = Pick<Photo, "id">;

export type CreatePhoto = Omit<Photo, "id">;

export type UpdatePhoto = Partial<CreatePhoto>;
