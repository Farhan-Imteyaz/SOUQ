/*
  Warnings:

  - The `status` column on the `AssistedPurchaseOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `purchaseDate` on the `InternationalItem` table. All the data in the column will be lost.
  - The `status` column on the `InternationalOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `purchaseDate` on the `ShopNShipItem` table. All the data in the column will be lost.
  - You are about to drop the column `courier_Type` on the `ShopNShipOrder` table. All the data in the column will be lost.
  - The `status` column on the `ShopNShipOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `order_type` column on the `ShopNShipOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `InternationalItemImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopNShipItemImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('commercial', 'personal');

-- CreateEnum
CREATE TYPE "CourierType" AS ENUM ('normal', 'express');

-- DropForeignKey
ALTER TABLE "InternationalItemImage" DROP CONSTRAINT "InternationalItemImage_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ShopNShipItemImage" DROP CONSTRAINT "ShopNShipItemImage_itemId_fkey";

-- AlterTable
ALTER TABLE "AssistedPurchaseItem" ALTER COLUMN "itemColor" SET DEFAULT '',
ALTER COLUMN "itemSize" SET DEFAULT '',
ALTER COLUMN "remarks" SET DEFAULT '',
ALTER COLUMN "itemWeight" SET DEFAULT '';

-- AlterTable
ALTER TABLE "AssistedPurchaseOrder" ALTER COLUMN "trackingNumber" SET DEFAULT '',
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "InternationalItem" DROP COLUMN "purchaseDate",
ALTER COLUMN "itemColor" SET DEFAULT '',
ALTER COLUMN "itemSize" SET DEFAULT '',
ALTER COLUMN "remarks" SET DEFAULT '',
ALTER COLUMN "itemWeight" SET DEFAULT '';

-- AlterTable
ALTER TABLE "InternationalOrder" ALTER COLUMN "trackingNumber" SET DEFAULT '',
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "ShopNShipItem" DROP COLUMN "purchaseDate",
ALTER COLUMN "itemColor" SET DEFAULT '',
ALTER COLUMN "itemSize" SET DEFAULT '',
ALTER COLUMN "remarks" SET DEFAULT '',
ALTER COLUMN "itemWeight" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ShopNShipOrder" DROP COLUMN "courier_Type",
ADD COLUMN     "courier_type" "CourierType" NOT NULL DEFAULT 'normal',
ALTER COLUMN "trackingNumber" SET DEFAULT '',
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending',
DROP COLUMN "order_type",
ADD COLUMN     "order_type" "OrderType" NOT NULL DEFAULT 'commercial';

-- DropTable
DROP TABLE "InternationalItemImage";

-- DropTable
DROP TABLE "ShopNShipItemImage";

-- CreateIndex
CREATE INDEX "AssistedPurchaseOrder_status_idx" ON "AssistedPurchaseOrder"("status");

-- CreateIndex
CREATE INDEX "InternationalOrder_status_idx" ON "InternationalOrder"("status");

-- CreateIndex
CREATE INDEX "ShopNShipOrder_status_idx" ON "ShopNShipOrder"("status");
