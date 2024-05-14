import { hash } from "bcryptjs";
import { PrismaWorkoutsRepository } from "../../repositories/prisma/prisma-Workouts-Repository"
import { WorkoutsRepository } from "../../repositories/prisma/workouts-Repository"
import { prisma } from "../../lib/prisma";
import { Prisma, TrainingType, User, Workouts } from "@prisma/client";

interface UpdateWorkoutsUseCaseRequest {
    id: string;                   
    training?: TrainingType;      
    cardio_minutes?: number;      
    details?: string;             
}

interface UpdateWorkoutsUseCaseResponse {
    workouts: Workouts;
}

export class WorkoutsChangesUseCase {

    constructor(private workoutsRepository: WorkoutsRepository){
    }

    async update({ id, training, cardio_minutes, details }: UpdateWorkoutsUseCaseRequest): Promise<UpdateWorkoutsUseCaseResponse> {

        const data: Prisma.WorkoutsUpdateInput = {};
    
        if (training !== undefined) {
            data.training = training;
        }
        if (cardio_minutes !== undefined) {
            data.cardio_minutes = cardio_minutes;
        }
        if (details !== undefined) {
            data.details = details;
        }
    
        const workouts = await this.workoutsRepository.update(
            { id },
            data     
        );

        if(!workouts){
            throw new Error('Error: Workout Not Found.')
        }
    
        return { workouts };
    }
    

}