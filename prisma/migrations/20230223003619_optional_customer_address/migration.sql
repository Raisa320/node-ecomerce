-- DropForeignKey
ALTER TABLE "Customer_address" DROP CONSTRAINT "Customer_address_customer_id_fkey";

-- AlterTable
ALTER TABLE "Customer_address" ALTER COLUMN "customer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Customer_address" ADD CONSTRAINT "Customer_address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
