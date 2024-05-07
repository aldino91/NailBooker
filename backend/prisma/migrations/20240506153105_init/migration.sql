/*
  Warnings:

  - You are about to drop the column `bookingDateTime` on the `Bookings` table. All the data in the column will be lost.
  - Added the required column `bookingDate` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "bookingDateTime",
ADD COLUMN     "bookingDate" TEXT NOT NULL;
