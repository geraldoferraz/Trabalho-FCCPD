import { PrismaGetUsersRepository } from "../../repositories/prisma/prisma-Users-Repository";
import { GetUserProfileUseCase } from "../authenticate/getUserProfile";

export function makeGetUserProfileUseCase(){
    const UsersRepository = new PrismaGetUsersRepository();
    const useCase = new GetUserProfileUseCase(UsersRepository); 

    return useCase
}