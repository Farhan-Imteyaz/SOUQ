/*
  Warnings:

  - You are about to drop the column `purchaseDate` on the `AssistedPurchaseItem` table. All the data in the column will be lost.
  - You are about to drop the `AssistedPurchaseItemImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssistedPurchaseItemImage" DROP CONSTRAINT "AssistedPurchaseItemImage_itemId_fkey";

-- AlterTable
ALTER TABLE "AssistedPurchaseItem" DROP COLUMN "purchaseDate";

-- DropTable
DROP TABLE "AssistedPurchaseItemImage";
