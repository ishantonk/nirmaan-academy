/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Ebook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Ebook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BlogCategory" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "public"."Ebook" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Page" ADD COLUMN     "metaDescription" VARCHAR(160),
ADD COLUMN     "metaKeywords" TEXT,
ADD COLUMN     "metaTitle" VARCHAR(70),
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "phone" VARCHAR(14);

-- AlterTable
ALTER TABLE "public"."WebsiteSetting" ADD COLUMN     "officialEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ebook_slug_key" ON "public"."Ebook"("slug");

-- CreateIndex
CREATE INDEX "Ebook_slug_idx" ON "public"."Ebook"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "public"."Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");
