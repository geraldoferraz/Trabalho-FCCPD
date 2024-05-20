/*
  Warnings:

  - The values [Peito,Triceps,Costas,Biceps,Ombro,Perna,Posterior_de_coxa,Gluteo,DayOff] on the enum `TrainingType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cardio_minutes` on the `Workouts` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `Workouts` table. All the data in the column will be lost.
  - You are about to drop the `LoadProgression` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrainingType_new" AS ENUM ('Strength', 'Cardio');
ALTER TABLE "Workouts" ALTER COLUMN "training" DROP DEFAULT;
ALTER TABLE "Workouts" ALTER COLUMN "training" TYPE "TrainingType_new" USING ("training"::text::"TrainingType_new");
ALTER TYPE "TrainingType" RENAME TO "TrainingType_old";
ALTER TYPE "TrainingType_new" RENAME TO "TrainingType";
DROP TYPE "TrainingType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "LoadProgression" DROP CONSTRAINT "LoadProgression_workoutDetailId_fkey";

-- AlterTable
ALTER TABLE "Workouts" DROP COLUMN "cardio_minutes",
DROP COLUMN "details",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "training" DROP DEFAULT;

-- DropTable
DROP TABLE "LoadProgression";

-- CreateTable
CREATE TABLE "Water" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Water_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Water" ADD CONSTRAINT "Water_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
