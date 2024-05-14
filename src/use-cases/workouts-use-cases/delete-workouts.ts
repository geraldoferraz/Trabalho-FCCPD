import { WorkoutsRepository } from "../../repositories/prisma/workouts-Repository"
import { Workouts } from "@prisma/client";
import { GetUsersRepository } from "../../repositories/prisma/users-Repository"

interface deleteWorkoutsUseCaseRequest {
    id: string;                             
}

interface deleteWorkoutsUseCaseResponse {
    workout: Workouts | undefined;
}


export class WorkoutsDeleteUseCase {

    constructor(
        private workoutsRepository: WorkoutsRepository
    ){}

    async delete({ id }: deleteWorkoutsUseCaseRequest): Promise<deleteWorkoutsUseCaseResponse> {

        const workout = await this.workoutsRepository.delete(
            id
        );

        if(!workout){
            throw new Error('Error: Workout Not Found.');
        }
    
        return { workout };
        }
    }
