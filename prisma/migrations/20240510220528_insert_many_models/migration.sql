-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('Peito', 'Triceps', 'Costas', 'Biceps', 'Ombro', 'Perna', 'Posterior_de_coxa', 'Gluteo');

-- CreateTable
CREATE TABLE "Workouts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "training" "TrainingType" NOT NULL,
    "cardio_minutes" INTEGER NOT NULL DEFAULT 0,
    "details" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weight" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentWeight" DECIMAL(65,30) NOT NULL,
    "targetWeight" DECIMAL(65,30),
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoadProgression" (
    "id" TEXT NOT NULL,
    "workoutDetailId" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "previousLoad" DECIMAL(65,30) NOT NULL,
    "currentLoad" DECIMAL(65,30) NOT NULL,
    "progress" DECIMAL(65,30) NOT NULL,
    "goalLoad" DECIMAL(65,30),

    CONSTRAINT "LoadProgression_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadProgression" ADD CONSTRAINT "LoadProgression_workoutDetailId_fkey" FOREIGN KEY ("workoutDetailId") REFERENCES "Workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
