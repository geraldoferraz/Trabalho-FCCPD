import { Prisma, Weight } from "@prisma/client";

export interface WeightRepository {
    create(data: Prisma.WeightCreateInput): Promise<Weight>;
    findLastByUserId(userId: string): Promise<Weight | null>;
    update(where: Prisma.WeightWhereUniqueInput, data: Prisma.WeightUpdateInput): Promise<Weight>;
    findAllByUser(userId: string): Promise<Weight[] | null>;
    findFirstWeightRegister(userId: string): Promise<Weight | null>
    delete(id: string): Promise<Weight | null>
}
