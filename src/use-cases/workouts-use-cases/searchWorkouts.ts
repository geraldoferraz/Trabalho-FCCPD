import { Workouts } from "@prisma/client";
import { WorkoutsRepository } from "../../repositories/prisma/workouts-Repository";

interface SearchWorkoutUseCaseRequest {
    userId: string;
}

interface SearchWorkoutUseCaseResponse {
    workouts: Workouts[];
}

export class SearchWorkoutUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) {}

    async execute({ userId }: SearchWorkoutUseCaseRequest): Promise<SearchWorkoutUseCaseResponse> {
        const workouts = await this.workoutsRepository.findAllByUserId(userId);

        if(!workouts){
            throw new Error('Error: User Not Found.')
        }

        return { workouts };
    }
}

