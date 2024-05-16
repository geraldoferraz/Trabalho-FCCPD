import { Prisma, PrismaClient, Weight } from "@prisma/client";
import { WeightRepository } from "./weight-repository";
import { prisma } from "../../lib/prisma";

export class PrismaWeightRepository implements WeightRepository {
    
    private prisma = new PrismaClient();

    async create(data: Prisma.WeightCreateInput) {
        const weight = await prisma.weight.create({
            data,
        })

        return weight
    }

    async findLastByUserId(userId: string): Promise<Weight | null> {
        return await this.prisma.weight.findFirst({
            where: { userId: userId },
            orderBy: { recorded_at: 'desc' }
        });
    }

    async update(where: Prisma.WeightWhereUniqueInput, data: Prisma.WeightUpdateInput){

        const existingWeight = await prisma.weight.findUnique({
            where
        });

        if (!existingWeight) {
            throw new Error('Error: Weight register Not Found.')
        }

        const weight = await prisma.weight.update({
            where,
            data
        })

        return weight
    }

    async findAllByUser(userId: string){
        const allWeights = await prisma.weight.findMany({
            where: { userId: userId },
            orderBy: {recorded_at: 'desc'}
        })
        return allWeights
    }

    async findFirstWeightRegister(userId: string){

        const weight = await this.prisma.weight.findFirst({
            where: { userId: userId },
            orderBy: { recorded_at: 'asc' }
        });

        return weight
    }

    async delete(id: string){
        const weight = await this.prisma.weight.delete({
            where: {
                id
            }
        })

        return weight
    }

}
