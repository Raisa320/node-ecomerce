/*
  Warnings:

  - You are about to drop the column `deleted` on the `Order_items` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Product_inventory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order_items" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Product_inventory" DROP COLUMN "deleted";
