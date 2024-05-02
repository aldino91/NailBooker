/*
  Warnings:

  - You are about to drop the column `emailValidate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailValidate",
ADD COLUMN     "emailValidated" BOOLEAN NOT NULL DEFAULT false;
