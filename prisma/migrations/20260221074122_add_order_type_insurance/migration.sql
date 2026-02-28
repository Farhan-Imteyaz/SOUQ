-- AlterTable
ALTER TABLE "ShopNShipOrder" ADD COLUMN     "courier_Type" TEXT NOT NULL DEFAULT 'normal',
ADD COLUMN     "order_type" TEXT NOT NULL DEFAULT 'commercial';
