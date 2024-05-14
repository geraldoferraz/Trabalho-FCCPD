import { User } from "@prisma/client";
import { GetUsersRepository } from "../../repositories/prisma/users-Repository"

interface deleteUsersUseCaseRequest {
    id: string;                             
}

interface deleteUsersUseCaseResponse {
    user: User | undefined | null
}


export class RegisterDeleteUseCase {

    constructor(private getUsersRepository: GetUsersRepository){
    }

    async delete({ id }: deleteUsersUseCaseRequest): Promise<deleteUsersUseCaseResponse> {

        const user = await this.getUsersRepository.delete(
            id
        );

        if(!user){
            throw new Error('Error: Workout Not Found.');
        }
    
        return { user };
        }
    }
