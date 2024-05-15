import { WeightRepository } from "../../repositories/prisma/weight-repository";
import { Prisma, Weight } from "@prisma/client";

interface UpdateWeightUseCaseRequest {
    id: string;
    currentWeight?: number;
    targetWeight?: number;          
}

interface UpdateWeightUseCaseResponse {
    weight: Weight;
}

export class WeightChangesUseCase {

    constructor(private WeightRepository: WeightRepository){
    }

    async update({ id, currentWeight, targetWeight }: UpdateWeightUseCaseRequest): Promise<UpdateWeightUseCaseResponse> {

        const data: Prisma.WeightUpdateInput = {};
    
        if (currentWeight !== undefined) {
            data.currentWeight = currentWeight;
        }
        if (targetWeight !== undefined) {
            data.targetWeight = targetWeight;
        }
    
        const weight = await this.WeightRepository.update(
            { id },
            data     
        );

        if(!weight){
            throw new Error('Error: Weight register Not Found.')
        }
    
        return { weight };
    }
    

}