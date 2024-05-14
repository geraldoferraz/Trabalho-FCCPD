import { PrismaClient, User, Prisma } from "@prisma/client";

export interface GetUsersRepository{
    findById(id: string): Promise<User | null>
    findAll(): Promise<User[]> | null
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    delete(id: string): Promise<User>;
    update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User>;
}