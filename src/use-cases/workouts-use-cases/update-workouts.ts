import { hash } from "bcryptjs";
import { PrismaWorkoutsRepository } from "../../repositories/prisma/prisma-Workouts-Repository"
import { WorkoutsRepository } from "../../repositories/prisma/workouts-Repository"
import { prisma } from "../../lib/prisma";
import { Prisma, TrainingType, User, Workouts } from "@prisma/client";

interface UpdateWorkoutsUseCaseRequest {
    id: string;                   
    training?: TrainingType;   
    name: string;   
    duration?: number;      
    description?: string;             
}

interface UpdateWorkoutsUseCaseResponse {
    workouts: Workouts;
}

export class WorkoutsChangesUseCase {

    constructor(private workoutsRepository: WorkoutsRepository){
    }

    async update({ id, training, name, duration, description }: UpdateWorkoutsUseCaseRequest): Promise<UpdateWorkoutsUseCaseResponse> {

        const data: Prisma.WorkoutsUpdateInput = {};
    
        if (training !== undefined) {
            data.training = training;
        }
        if (name !== undefined) {
            data.name = name;
        }
        if (duration !== undefined) {
            data.duration = duration;
        }
        if (description !== undefined) {
            data.description = description;
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