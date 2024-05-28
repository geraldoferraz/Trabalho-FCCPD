import { PrismaGetUsersRepository } from "../../repositories/prisma/prisma-Users-Repository";
import { GetUserRecordsCountUseCase } from "../user-use-cases/count-register-by-user-use-case";
import { RegisterDeleteUseCase } from "../user-use-cases/delete-register";
import { GetUserWorkoutsWithDetailsUseCase } from "../user-use-cases/get-register-details-use-case";
import { RegisterUseCase } from "../user-use-cases/register"
import { UserUpdateUseCase } from "../user-use-cases/update-register";

export function makeRegisterUseCase(){
        const prismaUsersRepository = new PrismaGetUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)

        return registerUseCase
}

export function makeDeleteRegisterUseCase(){
        const prismaUsersRepository = new PrismaGetUsersRepository()
        const registerUseCase = new RegisterDeleteUseCase(prismaUsersRepository)

        return registerUseCase
}

export function makeUpdateRegisterUseCase(){
        const prismaUsersRepository = new PrismaGetUsersRepository()
        const registerUseCase = new UserUpdateUseCase(prismaUsersRepository)

        return registerUseCase
}

export function makeGetUserRecordsCountUseCase() {
        const prismaUsersRepository = new PrismaGetUsersRepository()
        return new GetUserRecordsCountUseCase(prismaUsersRepository);
    }

export function makeGetUserWorkoutsWithDetailsUseCase() {
        const prismaUsersRepository = new PrismaGetUsersRepository()
        return new GetUserWorkoutsWithDetailsUseCase(prismaUsersRepository);
}