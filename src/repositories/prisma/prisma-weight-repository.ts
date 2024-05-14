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
    

}
