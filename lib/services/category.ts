import { Category, Prisma } from "@/app/generated/prisma";
import { parseOrThrow } from "./utils";
import { CategoryListQuery, CategoryListQuerySchema, CreateCategoryInput, CreateCategorySchema, UpdateCategoryInput, UpdateCategorySchema } from "../validators";
import { prisma } from "../prisma";

/** Select shape you commonly return to clients */
const categorySelect = {
    id: true,
    name: true,
    description: true,
    slug: true,
    status: true,
    isPopular: true,
    metaTitle: true,
    metaKeywords: true,       // stored as string
    metaDescription: true,
    parentId: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.CategorySelect;

// DTO: Data Transfer Object
export type CategoryDTO = Prisma.CategoryGetPayload<{ select: typeof categorySelect }>;

/** Create */
export async function createCategory(input: unknown): Promise<CategoryDTO> {
    const data = parseOrThrow<CreateCategoryInput>(CreateCategorySchema, input);

    try {
        const created = await prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
                slug: data.slug,
                status: data.status,
                isPopular: data.isPopular,
                metaTitle: data.metaTitle,
                metaKeywords: data.metaKeywords,
                metaDescription: data.metaDescription,
                parentId: data.parentId,
            },
            select: categorySelect,
        });
        return created;
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // P2002 unique constraint failed
            if (error.code === "P2002") {
                const fields = (error.meta?.target as string[]) ?? [];
                throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
            }
            // P2025 record not found (e.g., invalid parentId)
            if (error.code === "P2025") {
                throw new Error("Related record not found (check parentId).");
            }
        }
        throw error;
    }
}

/** Update (partial) */
export async function updateCategory(input: unknown): Promise<CategoryDTO> {
    const data = parseOrThrow<UpdateCategoryInput>(UpdateCategorySchema, input);

    const { id, ...rest } = data;

    try {
        const updated = await prisma.category.update({
            where: { id },
            data: {
                ...(rest.name !== undefined && { name: rest.name }),
                ...(rest.description !== undefined && { description: rest.description }),
                ...(rest.slug !== undefined && { slug: rest.slug }),
                ...(rest.status !== undefined && { status: rest.status }),
                ...(rest.isPopular !== undefined && { popular: rest.isPopular }),
                ...(rest.metaTitle !== undefined && { metaTitle: rest.metaTitle }),
                ...(rest.metaKeywords !== undefined && { metaKeyword: rest.metaKeywords }),
                ...(rest.metaDescription !== undefined && { metaDescription: rest.metaDescription }),
                ...(rest.parentId !== undefined && { parentId: rest.parentId }),
            },
            select: categorySelect,
        });
        return updated;
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // P2002 unique constraint failed
            if (error.code === "P2002") {
                const fields = (error.meta?.target as string[]) ?? [];
                throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
            }
            // P2025 record not found (e.g., invalid parentId)
            if (error.code === "P2025") {
                throw new Error("Category not found.");
            }
        }
        throw error;

    }
}

/** Delete (children cascade handled by schema onDelete: Cascade) */
export async function deleteCategory(id: string): Promise<{ id: string }> {
    try {
        const deleted = await prisma.category.delete({
            where: { id },
            select: { id: true },
        });
        return deleted;
    } catch (error: unknown) {
        // P2025 record not found (e.g., invalid parentId)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            throw new Error("Category not found.");
        }
        throw error;
    }
}

/** Get by id */
export async function getCategoryById(id: string): Promise<CategoryDTO | null> {
    return prisma.category.findUnique({
        where: { id },
        select: categorySelect,
    });
}

/** Get by slug */
export async function getCategoryBySlug(slug: string): Promise<CategoryDTO | null> {
    return prisma.category.findUnique({
        where: { slug },
        select: categorySelect,
    });
}

/** List with filters + cursor pagination */
export async function listCategories(input: unknown): Promise<{
    items: CategoryDTO[];
    nextCursor?: string;
    total?: number; // optional expensive count, enable when needed
}> {
    const params = parseOrThrow<CategoryListQuery>(CategoryListQuerySchema, input);

    const where: Prisma.CategoryWhereInput = {
        ...(params.status && { status: params.status }),
        ...(params.isPopular !== undefined && { popular: params.isPopular }),
        ...(params.parentId !== undefined && { parentId: params.parentId }),
        ...(params.q && {
            OR: [
                { name: { contains: params.q, mode: "insensitive" } },
                { description: { contains: params.q, mode: "insensitive" } },
            ],
        }),
    };

    const items = await prisma.category.findMany({
        where,
        take: params.take + 1, // fetch one extra for cursor
        ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
        orderBy: { [params.orderBy]: params.order },
        select: categorySelect,
    });

    let nextCursor: string | undefined = undefined;
    if (items.length > params.take) {
        const next = items.pop()!;
        nextCursor = next.id;
    }

    return { items, nextCursor };
}

/** Toggle popular flag */
export async function setPopular(id: string, isPopular: boolean): Promise<CategoryDTO> {
    try {
        return await prisma.category.update({
            where: { id },
            data: { isPopular },
            select: categorySelect,
        });
    } catch (error: unknown) {
        // P2025 record not found (e.g., invalid parentId)
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            throw new Error("Category not found.");
        }
        throw error;
    }
}

/** Update status */
export async function setStatus(id: string, status: Category["status"]): Promise<CategoryDTO> {
    return prisma.category.update({
        where: { id },
        data: { status },
        select: categorySelect,
    });
}