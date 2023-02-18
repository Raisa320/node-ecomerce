/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `Rol` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rol" DROP CONSTRAINT "Rol_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Rol" DROP CONSTRAINT "Rol_payment_id_fkey";

-- AlterTable
ALTER TABLE "Rol" DROP COLUMN "customer_id",
DROP COLUMN "payment_id";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "rol_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "telephone" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
