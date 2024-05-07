/*
  Warnings:

  - The primary key for the `Clients` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "usersId" TEXT;

-- AlterTable
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Clients_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Clients_id_seq";

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
