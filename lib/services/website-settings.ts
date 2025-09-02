import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateWebsiteSettingInput,
  CreateWebsiteSettingSchema,
  UpdateWebsiteSettingInput,
  UpdateWebsiteSettingSchema,
} from "../validators";

/** Select shape */
const websiteSettingSelect = {
  id: true,
  applicationName: true,
  tagline: true,
  bannerText: true,
  supportEmail: true,
  supportPhone: true,
  companyAddress: true,
  logo: true,
  favicon: true,
  metaTitle: true,
  metaKeywords: true,
  metaDescription: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.WebsiteSettingSelect;

export type WebsiteSettingDTO = Prisma.WebsiteSettingGetPayload<{
  select: typeof websiteSettingSelect;
}>;

/**
 * Get the single Website Setting
 */
export async function getWebsiteSetting(): Promise<WebsiteSettingDTO | null> {
  return prisma.websiteSetting.findFirst({
    select: websiteSettingSelect,
    orderBy: { createdAt: "asc" }, // Just in case multiple exist accidentally
  });
}

/**
 * Create Website Setting (allowed only if none exists)
 */
export async function createWebsiteSetting(
  input: unknown
): Promise<WebsiteSettingDTO> {
  const data = parseOrThrow<CreateWebsiteSettingInput>(
    CreateWebsiteSettingSchema,
    input
  );

  const existing = await prisma.websiteSetting.findFirst();
  if (existing) {
    throw new Error(
      "Website setting already exists. Only one record is allowed."
    );
  }

  try {
    return await prisma.websiteSetting.create({
      data,
      select: websiteSettingSelect,
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const fields = (error.meta?.target as string[]) ?? [];
      throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
    }
    throw error;
  }
}

/**
 * Update Website Setting
 * - If `id` provided → update that record
 * - If `id` not provided → update the first record
 */
export async function updateWebsiteSetting(
  input: unknown
): Promise<WebsiteSettingDTO> {
  const data = parseOrThrow<UpdateWebsiteSettingInput>(
    UpdateWebsiteSettingSchema,
    input
  );

  const existing = await prisma.websiteSetting.findFirst();
  if (!existing) {
    throw new Error("Website setting does not exist. Please create one first.");
  }

  try {
    return await prisma.websiteSetting.update({
      where: { id: existing.id },
      data: {
        ...(data.applicationName !== undefined && {
          applicationName: data.applicationName,
        }),
        ...(data.tagline !== undefined && { tagline: data.tagline }),
        ...(data.bannerText !== undefined && { bannerText: data.bannerText }),
        ...(data.supportEmail !== undefined && {
          supportEmail: data.supportEmail,
        }),
        ...(data.supportPhone !== undefined && {
          supportPhone: data.supportPhone,
        }),
        ...(data.officialEmail !== undefined && {
          officialEmail: data.officialEmail,
        }),
        ...(data.companyAddress !== undefined && {
          companyAddress: data.companyAddress,
        }),
        ...(data.logo !== undefined && { logo: data.logo }),
        ...(data.favicon !== undefined && { favicon: data.favicon }),
        ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle }),
        ...(data.metaKeywords !== undefined && {
          metaKeywords: data.metaKeywords,
        }),
        ...(data.metaDescription !== undefined && {
          metaDescription: data.metaDescription,
        }),
      },
      select: websiteSettingSelect,
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Website setting not found.");
    }
    throw error;
  }
}

/**
 * Delete Website Setting (rarely needed)
 */
export async function deleteWebsiteSetting(): Promise<{ id: string }> {
  const existing = await prisma.websiteSetting.findFirst();
  if (!existing) {
    throw new Error("No website setting found to delete.");
  }

  return prisma.websiteSetting.delete({
    where: { id: existing.id },
    select: { id: true },
  });
}
