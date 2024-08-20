import { PrismaGetUsersRepository } from "../../repositories/prisma/prisma-Users-Repository";
import { AutheticateUseCase } from "../authenticate/authenticate";

export function makeAuthenticateUseCase(){
    const UsersRepository = new PrismaGetUsersRepository();
    const authenticateUseCase = new AutheticateUseCase(UsersRepository); 

    return authenticateUseCase
}