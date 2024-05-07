/*
  Warnings:

  - Added the required column `bookingDateTime` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "bookingDateTime" TEXT NOT NULL;
