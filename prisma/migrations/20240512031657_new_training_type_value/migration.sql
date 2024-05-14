/*
  Warnings:

  - The values [FullBody] on the enum `TrainingType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrainingType_new" AS ENUM ('Peito', 'Triceps', 'Costas', 'Biceps', 'Ombro', 'Perna', 'Posterior_de_coxa', 'Gluteo', 'DayOff');
ALTER TABLE "Workouts" ALTER COLUMN "training" TYPE "TrainingType_new" USING ("training"::text::"TrainingType_new");
ALTER TYPE "TrainingType" RENAME TO "TrainingType_old";
ALTER TYPE "TrainingType_new" RENAME TO "TrainingType";
DROP TYPE "TrainingType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Workouts" ALTER COLUMN "training" SET DEFAULT 'DayOff';
