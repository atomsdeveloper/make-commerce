/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "number" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "street" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "zipCode" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "public"."Address";
