/*
  Warnings:

  - Changed the type of `consumptionMethod` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Method" AS ENUM ('MAIL', 'MOTORBIKE', 'PICKUP');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "consumptionMethod",
ADD COLUMN     "consumptionMethod" "Method" NOT NULL;

-- DropEnum
DROP TYPE "ConsumptionMethod";
