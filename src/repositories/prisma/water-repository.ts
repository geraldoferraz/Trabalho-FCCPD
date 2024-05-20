import { Prisma, Water } from "@prisma/client";

export interface WaterRepository {
    create(data: Prisma.WaterCreateInput): Promise<Water>;
    update(where: Prisma.WaterWhereUniqueInput, data: Prisma.WaterUpdateInput): Promise<Water>;
    findAllByUser(userId: string): Promise<Water[] | null>;
    delete(id: string): Promise<Water | null>
}
