-- AlterTable
ALTER TABLE "Customer_address" ALTER COLUMN "address_line2" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "postal_code" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "telephone" DROP NOT NULL,
ALTER COLUMN "mobile" DROP NOT NULL;