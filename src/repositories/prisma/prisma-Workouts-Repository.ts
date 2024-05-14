import { $Enums, Prisma, PrismaClient, TrainingType, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { WorkoutsRepository } from './workouts-Repository'

export class PrismaWorkoutsRepository implements WorkoutsRepository {

    private prisma = new PrismaClient();

    async findAllByUserId(userId: string) {

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!existingUser){
            throw new Error('Error: User Not Found.')
        }

        const workouts = await this.prisma.workouts.findMany({
            where: {
                userId,
            }
        });

        return workouts
    }

    async findAllByTraining(userId: string, trainingType: TrainingType) {

        return await prisma.workouts.findMany({
          where: {
            userId,
            training: trainingType,
          }
        });
      }

    async create(data: Prisma.WorkoutsCreateInput){
        const workout = await prisma.workouts.create({
            data,
        })

        return workout
    }

    async update(where: Prisma.WorkoutsWhereUniqueInput, data: Prisma.WorkoutsUpdateInput){

        const existingWorkout = await prisma.workouts.findUnique({
            where
        });
    
        if (!existingWorkout) {
            throw new Error('Error: Workout Not Found.')
        }

        const workout = await prisma.workouts.update({
            where,
            data
        })

        return workout
    }

    async delete(id: string) {

        const existingWorkout = await this.prisma.workouts.findUnique({
            where: { id }
        });
    
        if (!existingWorkout) {
            throw new Error('Error: Workout Not Found.')
        }    

        const workouts = await this.prisma.workouts.delete({
            where: {
                id
            }
        })

        return workouts
    }

}