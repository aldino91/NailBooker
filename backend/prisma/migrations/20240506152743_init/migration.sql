/*
  Warnings:

  - Added the required column `bookingTime` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "bookingTime" TEXT NOT NULL;
