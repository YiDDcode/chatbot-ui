/*
  Warnings:

  - You are about to drop the column `points` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "points",
ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 100;
