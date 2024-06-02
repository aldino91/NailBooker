/*
  Warnings:

  - You are about to drop the column `author` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `bookingDate` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `bookingTime` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `jobType` on the `Bookings` table. All the data in the column will be lost.
  - Added the required column `dayBook` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourBook` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "author",
DROP COLUMN "bookingDate",
DROP COLUMN "bookingTime",
DROP COLUMN "jobType",
ADD COLUMN     "dayBook" TEXT NOT NULL,
ADD COLUMN     "hourBook" TEXT NOT NULL,
ADD COLUMN     "services" TEXT[],
ALTER COLUMN "duration" SET DATA TYPE TEXT;
