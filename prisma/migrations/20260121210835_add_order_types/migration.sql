/*
  Warnings:

  - You are about to drop the `ItemImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemImage" DROP CONSTRAINT "ItemImage_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropTable
DROP TABLE "ItemImage";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- CreateTable
CREATE TABLE "ShopNShipOrder" (
    "id" UUID NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "addressId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopNShipOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopNShipItem" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "storeOrderId" TEXT NOT NULL,
    "itemColor" TEXT NOT NULL,
    "itemSize" TEXT NOT NULL,
    "itemQuantity" INTEGER NOT NULL,
    "itemPrice" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "itemWeight" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopNShipItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopNShipItemImage" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "imagePath" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShopNShipItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistedPurchaseOrder" (
    "id" UUID NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "addressId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssistedPurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistedPurchaseItem" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "storeOrderId" TEXT NOT NULL,
    "itemColor" TEXT NOT NULL,
    "itemSize" TEXT NOT NULL,
    "itemQuantity" INTEGER NOT NULL,
    "itemPrice" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "itemWeight" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssistedPurchaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistedPurchaseItemImage" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "imagePath" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssistedPurchaseItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternationalOrder" (
    "id" UUID NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "addressId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternationalOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternationalItem" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "storeOrderId" TEXT NOT NULL,
    "itemColor" TEXT NOT NULL,
    "itemSize" TEXT NOT NULL,
    "itemQuantity" INTEGER NOT NULL,
    "itemPrice" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "itemWeight" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternationalItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternationalItemImage" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "imagePath" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InternationalItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopNShipOrder_orderId_key" ON "ShopNShipOrder"("orderId");

-- CreateIndex
CREATE INDEX "ShopNShipOrder_orderId_idx" ON "ShopNShipOrder"("orderId");

-- CreateIndex
CREATE INDEX "ShopNShipOrder_userId_idx" ON "ShopNShipOrder"("userId");

-- CreateIndex
CREATE INDEX "ShopNShipOrder_status_idx" ON "ShopNShipOrder"("status");

-- CreateIndex
CREATE INDEX "ShopNShipOrder_createdAt_idx" ON "ShopNShipOrder"("createdAt");

-- CreateIndex
CREATE INDEX "ShopNShipItem_orderId_idx" ON "ShopNShipItem"("orderId");

-- CreateIndex
CREATE INDEX "ShopNShipItem_itemName_idx" ON "ShopNShipItem"("itemName");

-- CreateIndex
CREATE INDEX "ShopNShipItemImage_itemId_idx" ON "ShopNShipItemImage"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "AssistedPurchaseOrder_orderId_key" ON "AssistedPurchaseOrder"("orderId");

-- CreateIndex
CREATE INDEX "AssistedPurchaseOrder_orderId_idx" ON "AssistedPurchaseOrder"("orderId");

-- CreateIndex
CREATE INDEX "AssistedPurchaseOrder_userId_idx" ON "AssistedPurchaseOrder"("userId");

-- CreateIndex
CREATE INDEX "AssistedPurchaseOrder_status_idx" ON "AssistedPurchaseOrder"("status");

-- CreateIndex
CREATE INDEX "AssistedPurchaseOrder_createdAt_idx" ON "AssistedPurchaseOrder"("createdAt");

-- CreateIndex
CREATE INDEX "AssistedPurchaseItem_orderId_idx" ON "AssistedPurchaseItem"("orderId");

-- CreateIndex
CREATE INDEX "AssistedPurchaseItem_itemName_idx" ON "AssistedPurchaseItem"("itemName");

-- CreateIndex
CREATE INDEX "AssistedPurchaseItemImage_itemId_idx" ON "AssistedPurchaseItemImage"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "InternationalOrder_orderId_key" ON "InternationalOrder"("orderId");

-- CreateIndex
CREATE INDEX "InternationalOrder_orderId_idx" ON "InternationalOrder"("orderId");

-- CreateIndex
CREATE INDEX "InternationalOrder_userId_idx" ON "InternationalOrder"("userId");

-- CreateIndex
CREATE INDEX "InternationalOrder_status_idx" ON "InternationalOrder"("status");

-- CreateIndex
CREATE INDEX "InternationalOrder_createdAt_idx" ON "InternationalOrder"("createdAt");

-- CreateIndex
CREATE INDEX "InternationalItem_orderId_idx" ON "InternationalItem"("orderId");

-- CreateIndex
CREATE INDEX "InternationalItem_itemName_idx" ON "InternationalItem"("itemName");

-- CreateIndex
CREATE INDEX "InternationalItemImage_itemId_idx" ON "InternationalItemImage"("itemId");

-- AddForeignKey
ALTER TABLE "ShopNShipOrder" ADD CONSTRAINT "ShopNShipOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopNShipOrder" ADD CONSTRAINT "ShopNShipOrder_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopNShipItem" ADD CONSTRAINT "ShopNShipItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "ShopNShipOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopNShipItemImage" ADD CONSTRAINT "ShopNShipItemImage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ShopNShipItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistedPurchaseOrder" ADD CONSTRAINT "AssistedPurchaseOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistedPurchaseOrder" ADD CONSTRAINT "AssistedPurchaseOrder_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistedPurchaseItem" ADD CONSTRAINT "AssistedPurchaseItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "AssistedPurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistedPurchaseItemImage" ADD CONSTRAINT "AssistedPurchaseItemImage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "AssistedPurchaseItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternationalOrder" ADD CONSTRAINT "InternationalOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternationalOrder" ADD CONSTRAINT "InternationalOrder_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternationalItem" ADD CONSTRAINT "InternationalItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "InternationalOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternationalItemImage" ADD CONSTRAINT "InternationalItemImage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InternationalItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
