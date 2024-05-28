import { hash } from "bcryptjs";
import { PrismaGetUsersRepository } from "../../repositories/prisma/prisma-Users-Repository";
import { GetUsersRepository } from "../../repositories/prisma/users-Repository";
import { prisma } from "../../lib/prisma";
import { User } from "@prisma/client";

interface GetUserRecordsCountUseCaseRequest {
    userId: string;
}

interface GetUserRecordsCountUseCaseResponse {
    workoutsCount: number;
    weightsCount: number;
    watersCount: number;
}

export class GetUserRecordsCountUseCase {

    constructor(private getUsersRepository: GetUsersRepository){
    }

    async execute({ userId }: GetUserRecordsCountUseCaseRequest): Promise<GetUserRecordsCountUseCaseResponse> {
        const userDetails = await this.getUsersRepository.findUserRecordsCount(userId);

        if (!userDetails) {
            throw new Error('No details found for this user.');
        }

        return userDetails;
    }
}