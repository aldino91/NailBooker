/*
  Warnings:

  - Changed the type of `dayBook` on the `Bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "dayBook",
ADD COLUMN     "dayBook" INTEGER NOT NULL;
