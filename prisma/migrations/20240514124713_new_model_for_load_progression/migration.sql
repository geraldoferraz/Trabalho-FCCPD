/*
  Warnings:

  - You are about to drop the column `previousLoad` on the `LoadProgression` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `LoadProgression` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LoadProgression" DROP COLUMN "previousLoad",
DROP COLUMN "progress";
