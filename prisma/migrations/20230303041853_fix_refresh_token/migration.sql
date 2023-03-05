/*
  Warnings:

  - The primary key for the `Refresh_token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Refresh_token` table. All the data in the column will be lost.
  - You are about to drop the column `hashedToken` on the `Refresh_token` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Refresh_token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Refresh_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashed_token` to the `Refresh_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Refresh_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Refresh_token" DROP CONSTRAINT "Refresh_token_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "hashedToken",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hashed_token" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Refresh_token_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Refresh_token_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_token_id_key" ON "Refresh_token"("id");
