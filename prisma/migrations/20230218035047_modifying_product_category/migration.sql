/*
  Warnings:

  - Made the column `name` on table `Product_category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product_category" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "delete_at" DROP NOT NULL;
