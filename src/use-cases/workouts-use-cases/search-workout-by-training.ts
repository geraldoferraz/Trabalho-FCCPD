import { TrainingType, Workouts } from "@prisma/client";
import { WorkoutsRepository } from "../../repositories/prisma/workouts-Repository"

interface SearchWorkoutUseCaseRequest {
    userId: string;
    trainingType?: TrainingType
}

interface SearchWorkoutUseCaseResponse {
    workouts: Workouts[];
}

export class SearchWorkoutByTrainingUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) {}

    async execute({ userId, trainingType }: SearchWorkoutUseCaseRequest): Promise<SearchWorkoutUseCaseResponse>{

        const workouts = await this.workoutsRepository.findAllByTraining(userId, trainingType);

        if (workouts.length === 0) {
            throw new Error(`No workouts found for user ${userId} with training type ${trainingType}`);
        }

        return { workouts }
    }
}