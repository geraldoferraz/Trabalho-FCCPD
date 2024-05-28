import { hash } from "bcryptjs";
import { PrismaGetUsersRepository } from "../../repositories/prisma/prisma-Users-Repository";
import { GetUsersRepository } from "../../repositories/prisma/users-Repository";
import { prisma } from "../../lib/prisma";
import { User } from "@prisma/client";
import { Workouts, Weight, Water } from "@prisma/client";

interface GetUserWorkoutsWithDetailsUseCaseRequest {
    userId: string;
}

interface GetUserWorkoutsWithDetailsUseCaseResponse {
    workouts: Workouts[];
    weights: Weight[];
    waters: Water[];
}

export class GetUserWorkoutsWithDetailsUseCase {
    constructor(private getUsersRepository: GetUsersRepository){
    }

    async execute({ userId }: GetUserWorkoutsWithDetailsUseCaseRequest): Promise<GetUserWorkoutsWithDetailsUseCaseResponse> {
        const userDetails = await this.getUsersRepository.findUserWorkoutsWithDetails(userId);

        if (!userDetails) {
            throw new Error(`No details found for user ${userId}`);
        }

        return userDetails;
    }
}
