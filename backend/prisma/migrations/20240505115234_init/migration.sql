/*
  Warnings:

  - You are about to drop the column `reserverCreator` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `author` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "reserverCreator",
ADD COLUMN     "author" TEXT NOT NULL;
