import { Prisma, TrainingType, Workouts } from "@prisma/client";

export interface WorkoutsRepository {
    create(data: Prisma.WorkoutsCreateInput): Promise<Workouts>;
    findAllByUserId(userId: string): Promise<Workouts[]>;
    findAllByTraining(userId: string, trainingType?: TrainingType): Promise<Workouts[]>;
    update(where: Prisma.WorkoutsWhereUniqueInput, data: Prisma.WorkoutsUpdateInput): Promise<Workouts>;
    delete(id: string): Promise<Workouts>;
}
