import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateUserInput,
  CreateUserSchema,
  UpdateUserInput,
  UpdateUserSchema,
  UserListQueryInput,
  UserListQuerySchema,
} from "../validators";

/** Common select shape */
const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  emailVerified: true,
  image: true,
  role: true,
  bio: true,
  accounts: {
    select: {
      provider: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

/** DTO Type */
export type UserDTO = Prisma.UserGetPayload<{ select: typeof userSelect }>;

/** Create User */
export async function createUser(input: unknown): Promise<UserDTO> {
  const data = parseOrThrow<CreateUserInput>(CreateUserSchema, input);

  try {
    const created = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        image: data.image,
        role: data.role ?? "STUDENT",
        bio: data.bio,
      },
      select: userSelect,
    });

    return created;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
    }
    throw error;
  }
}

/** Update User */
export async function updateUser(input: unknown): Promise<UserDTO> {
  const data = parseOrThrow<UpdateUserInput>(UpdateUserSchema, input);
  const { id, ...rest } = data;

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(rest.name !== undefined && { name: rest.name }),
        ...(rest.email !== undefined && { email: rest.email }),
        ...(rest.phone !== undefined && { phone: rest.phone }),
        ...(rest.password !== undefined && { password: rest.password }),
        ...(rest.image !== undefined && { image: rest.image }),
        ...(rest.role !== undefined && { role: rest.role }),
        ...(rest.bio !== undefined && { bio: rest.bio }),
      },
      select: userSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("User not found.");
      }
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
    }
    throw error;
  }
}

/** Delete User */
export async function deleteUser(id: string): Promise<{ id: string }> {
  try {
    return await prisma.user.delete({
      where: { id },
      select: { id: true },
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("User not found.");
      }
    }
    throw error;
  }
}

/** Get User by ID */
export async function getUserById(id: string): Promise<UserDTO | null> {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
}

/** Get User by Email */
export async function getUserByEmail(email: string): Promise<UserDTO | null> {
  return prisma.user.findUnique({
    where: { email },
    select: userSelect,
  });
}

/** List Users with Filters + Pagination */
export async function listUsers(input: unknown): Promise<{
  items: UserDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<UserListQueryInput>(UserListQuerySchema, input);

  const where: Prisma.UserWhereInput = {
    ...(params.q && {
      OR: [
        { name: { contains: params.q, mode: "insensitive" } },
        { email: { contains: params.q, mode: "insensitive" } },
        { phone: { contains: params.q, mode: "insensitive" } },
      ],
    }),
    ...(params.role && { role: params.role }),
  };

  const items = await prisma.user.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: userSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Update User Role */
export async function updateUserRole(
  id: string,
  role: UserDTO["role"]
): Promise<UserDTO> {
  try {
    return await prisma.user.update({
      where: { id },
      data: { role },
      select: userSelect,
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("User not found.");
    }
    throw error;
  }
}
