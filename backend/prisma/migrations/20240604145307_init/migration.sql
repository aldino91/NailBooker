/*
  Warnings:

  - You are about to alter the column `dayBook` on the `Bookings` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "dayBook" SET DATA TYPE INTEGER;
