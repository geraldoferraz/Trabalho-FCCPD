import { Prisma, PrismaClient, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { GetUsersRepository } from './users-Repository';

export class PrismaGetUsersRepository implements GetUsersRepository{ //tudo oque tem ligacao com om banco

    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user;
    }

    async findAll(){
        const users = await prisma.user.findMany();
        return users
    }

    async findByEmail(email: string){

        const UserWithEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return UserWithEmail; 
    }

    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
        })
        return user
    }

    async delete(id: string) {

        const existingUser = await prisma.user.findUnique({
            where: { id }
        });
    
        if (!existingUser) {
            throw new Error('Error: User Not Found.')
        }    

        const user = await prisma.user.delete({
            where: {
                id
            }
        })

        return user
    }

    async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
        const existingUser = await prisma.user.findUnique({
            where
        });
    
        if (!existingUser) {
            throw new Error('Error: User Not Found.')
        }

        const user = await prisma.user.update({
            where,
            data
        })

        return user
    }

    async findUserRecordsCount(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                _count: {
                    select: {
                        workouts: true,
                        weights: true,
                        waters: true,
                    },
                },
            },
        });

        if (!user) {
            return null;
        }

        return {
            workoutsCount: user._count.workouts,
            weightsCount: user._count.weights,
            watersCount: user._count.waters,
        };
    }

    async findUserWorkoutsWithDetails(userId: string){
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                workouts: true,
                weights: true,
                waters: true,
            },
        });

        if (!user) {
            return null;
        }

        return {
            workouts: user.workouts,
            weights: user.weights,
            waters: user.waters,
        };
    }

}