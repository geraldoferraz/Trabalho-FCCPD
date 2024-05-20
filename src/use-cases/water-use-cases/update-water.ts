import { Decimal } from "@prisma/client/runtime/library";
import { WaterRepository } from "../../repositories/prisma/water-repository";
import { Prisma, Water } from "@prisma/client";

interface UpdateWaterUseCaseRequest {
    id: string;
    amount: Decimal      
}

interface UpdateWaterUseCaseResponse {
    water: Water;
}

export class WaterChangesUseCase {

    constructor(private waterRepository: WaterRepository){
    }

    async update({ id, amount }: UpdateWaterUseCaseRequest): Promise<UpdateWaterUseCaseResponse> {

        const data: Prisma.WaterUpdateInput = {};
    
        if (amount !== undefined) {
            data.amount = amount;
        }
    
        const water = await this.waterRepository.update(
            { id },
            data     
        );

        if(!water){
            throw new Error('Error: Weight register Not Found.')
        }
    
        return { water };
    }
    

}