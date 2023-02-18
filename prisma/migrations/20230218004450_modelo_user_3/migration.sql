/*
  Warnings:

  - Added the required column `order_details_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "order_details_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_order_details_id_fkey" FOREIGN KEY ("order_details_id") REFERENCES "Order_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
