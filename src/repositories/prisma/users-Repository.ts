import { PrismaClient, User, Prisma, Workouts, Water, Weight } from "@prisma/client";

export interface GetUsersRepository{
    findById(id: string): Promise<User | null>
    findAll(): Promise<User[]> | null
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    findUserRecordsCount(userId: string): Promise<{ workoutsCount: number, weightsCount: number, watersCount: number } | null>;
    findUserWorkoutsWithDetails(userId: string): Promise<{ workouts: Workouts[], weights: Weight[], waters: Water[] } | null>;
    delete(id: string): Promise<User>;
    update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User>;
}