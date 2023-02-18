-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "telephone" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_details" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer_address" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "telephone" INTEGER NOT NULL,
    "mobile" INTEGER NOT NULL,

    CONSTRAINT "Customer_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer_payment" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "account_no" INTEGER NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shopping_session" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shopping_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart_item" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "desc" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "desc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_inventory" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3) NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Product_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "desc" TEXT NOT NULL,
    "discount_percent" DECIMAL(65,30) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment_details" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Order_details_customer_id_key" ON "Order_details"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_details_payment_id_key" ON "Order_details"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_items_product_id_key" ON "Order_items"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Shopping_session_customer_id_key" ON "Shopping_session"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_item_product_id_key" ON "Cart_item"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_SKU_key" ON "Product"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "Product_inventory_product_id_key" ON "Product_inventory"("product_id");

-- AddForeignKey
ALTER TABLE "Order_details" ADD CONSTRAINT "Order_details_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_details" ADD CONSTRAINT "Order_details_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_address" ADD CONSTRAINT "Customer_address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_payment" ADD CONSTRAINT "Customer_payment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shopping_session" ADD CONSTRAINT "Shopping_session_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_item" ADD CONSTRAINT "Cart_item_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Shopping_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_item" ADD CONSTRAINT "Cart_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_inventory" ADD CONSTRAINT "Product_inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rol" ADD CONSTRAINT "Rol_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rol" ADD CONSTRAINT "Rol_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
