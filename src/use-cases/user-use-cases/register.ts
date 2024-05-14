import { hash } from "bcryptjs";
import { PrismaGetUsersRepository } from "../../repositories/prisma/prisma-Users-Repository";
import { GetUsersRepository } from "../../repositories/prisma/users-Repository";
import { prisma } from "../../lib/prisma";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
    age: number
}

interface GetRegisterUseCaseRequest {
    id: string
}

interface GetRegisterUseCaseRequestWithEmail {
    email: string
}

interface RegisterUseCaseResponse {
    user: User | undefined | null
}

export class RegisterUseCase {

    constructor(private getUsersRepository: GetUsersRepository){
    }

    async execute({ name, email, password, age}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const password_hash = await hash(password, 6); //fazendo o hashing 
    
        const EmailExisting = await this.getUsersRepository.findByEmail(email)

        if(EmailExisting){
            throw new Error('Email Already Exists');
        }
    
       const user = await this.getUsersRepository.create({
            name,
            email,
            password_hash,
            age
        })

        return { user }
    }
    
    async executeExplorerById({ id }: GetRegisterUseCaseRequest) { //aqui nos temos o metodo execute que cria um user 

        const userExisting = await this.getUsersRepository.findById(id); 

        if(!userExisting){
            throw new Error('User not found');
        }
        return userExisting;
    }

    async executeExplorerByEmail({ email }: GetRegisterUseCaseRequestWithEmail){

        const userWithEmail = await this.getUsersRepository.findByEmail(email); 

        if(!userWithEmail){
            throw new Error('No users found.')
        }
        return userWithEmail
    }

    async executeExplorerForAllUsers(){

        const users = await this.getUsersRepository.findAll(); 

        if(!users){
            throw new Error('No users found.')
        }

        return users;
    }
}
 
