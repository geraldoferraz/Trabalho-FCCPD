import { Prisma, Weight } from "@prisma/client";

export interface WeightRepository {
    create(data: Prisma.WeightCreateInput): Promise<Weight>;
    findLastByUserId(userId: string): Promise<Weight | null>;
}
