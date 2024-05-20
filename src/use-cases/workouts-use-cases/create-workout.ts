import { hash } from "bcryptjs";
import { PrismaWorkoutsRepository } from "../../repositories/prisma/prisma-Workouts-Repository"
import { WorkoutsRepository } from "../../repositories/prisma/workouts-Repository"
import { prisma } from "../../lib/prisma";
import { TrainingType, User, Workouts } from "@prisma/client";

interface WorkoutsUseCaseRequest {
    userId: string;              
    training: TrainingType;   
    name: string;  
    duration: number;      
    description?: string;            
}

interface WorkoutsUseCaseResponse {
    workouts: Workouts
}

export class WorkoutsUseCase {

    constructor(private workoutsRepository: WorkoutsRepository){
    }

    async execute({ userId, training, name, duration, description}: WorkoutsUseCaseRequest): Promise<WorkoutsUseCaseResponse> {
    
       const workouts = await this.workoutsRepository.create({
            user: {
                connect: { id: userId }
            },
            training,
            duration,
            name,
            description
        })

        return { workouts }
    }

}
 
