import { Prisma, TrainingType, User, Workouts } from "@prisma/client";
import { GetUsersRepository } from "../../repositories/prisma/users-Repository";
import { hash } from "bcryptjs";

interface UpdateUserUseCaseRequest {
    id: string
    name?: string
    email?: string
    password?: string
    age?: number           
}

interface UpdateUserUseCaseResponse {
    user: User;
}

export class UserUpdateUseCase {

    constructor(private getUsersRepository: GetUsersRepository){
    }

    async update({ id, name, email, password, age }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

        const data: Prisma.UserUpdateInput = {};
    
        if (name !== undefined) {
            data.name = name;
        }
        if (email !== undefined) {
            data.email = email;
        }
        if (password !== undefined) {
            const password_hash = await hash(password, 6); 
            data.password_hash = password_hash;
        }
        if (age !== undefined) {
            data.age = age;
        }
    
        const user = await this.getUsersRepository.update(
            { id },
            data     
        );

        if(!user){
            throw new Error('Error: Workout Not Found.')
        }
    
        return { user };
    }
    

}