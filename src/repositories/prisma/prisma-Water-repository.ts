import { Prisma, PrismaClient, Weight } from "@prisma/client";
import { WaterRepository } from "./water-repository";
import { prisma } from "../../lib/prisma";

export class PrismaWaterRepository implements WaterRepository {
    
    private prisma = new PrismaClient();

    async create(data: Prisma.WaterCreateInput) {
        const water = await prisma.water.create({
            data,
        })

        return water
    }

    async update(where: Prisma.WaterWhereUniqueInput, data: Prisma.WaterUpdateInput){

        const existingWater = await prisma.water.findUnique({
            where
        });

        if (!existingWater) {
            throw new Error('Error: Weight register Not Found.')
        }

        const weight = await prisma.water.update({
            where,
            data
        })

        return weight
    }

    async findAllByUser(userId: string){
        const allWaters = await prisma.water.findMany({
            where: { userId: userId },
            orderBy: {createdAt: 'desc'}
        })
        return allWaters
    }

    async delete(id: string){
        const water = await this.prisma.water.delete({
            where: {
                id
            }
        })

        return water
    }

}
