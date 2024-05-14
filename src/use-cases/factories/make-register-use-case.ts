import { PrismaGetUsersRepository } from "../../repositories/prisma/prisma-Users-Repository";
import { RegisterDeleteUseCase } from "../user-use-cases/delete-register";
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
