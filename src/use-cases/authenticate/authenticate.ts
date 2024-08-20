import { GetUsersRepository } from "../../repositories/prisma/users-Repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AutheticateUseCaseRequest {
    email: string,
    password: string
}

interface AutheticateUseCaseResponse {
    user: User
}

export class AutheticateUseCase {
    constructor(
        private usersRepository: GetUsersRepository,
        ){}

        async execute({ email, password }: AutheticateUseCaseRequest): Promise<AutheticateUseCaseResponse>{
            const user = await this.usersRepository.findByEmail(email)

            if(!user){
                throw new Error('Error: User Not Found!')
            }

            const doesPasswordMatches = await compare(password, user.password_hash)

            if(!doesPasswordMatches){
                throw new Error('Error: Senha Incorreta, tente novamente mais tarde.')
            }
            
            return { user }
        }
}