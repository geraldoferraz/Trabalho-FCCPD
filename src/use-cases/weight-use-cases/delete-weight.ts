import { WorkoutsRepository } from "../../repositories/prisma/workouts-Repository"
import { Weight } from "@prisma/client";
import { WeightRepository } from "../../repositories/prisma/weight-repository";

interface deleteWeightUseCaseRequest {
    id: string;                             
}

interface deleteWeightUseCaseResponse {
    weight: Weight | null;
}


export class WeightDeleteUseCase {

    constructor(
        private WeightRepository: WeightRepository
    ){}

    async delete({ id }: deleteWeightUseCaseRequest): Promise<deleteWeightUseCaseResponse> {

        const weight = await this.WeightRepository.delete(
            id
        );

        if(!weight){
            throw new Error('Error: Weight register Not Found.');
        }
    
        return { weight };
        }
    }
