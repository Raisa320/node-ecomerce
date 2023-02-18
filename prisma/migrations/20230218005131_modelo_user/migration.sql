/*
  Warnings:

  - You are about to drop the column `order_details_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Order_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_order_details_id_fkey";

-- AlterTable
ALTER TABLE "Order_details" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "order_details_id";

-- AddForeignKey
ALTER TABLE "Order_details" ADD CONSTRAINT "Order_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
