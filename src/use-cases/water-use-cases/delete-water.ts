import { Water } from "@prisma/client";
import { WaterRepository } from "../../repositories/prisma/water-repository";

interface deleteWaterUseCaseRequest {
    id: string;                             
}

interface deleteWaterUseCaseResponse {
    water: Water | null;
}


export class WaterDeleteUseCase {

    constructor(
        private waterRepository: WaterRepository
    ){}

    async delete({ id }: deleteWaterUseCaseRequest): Promise<deleteWaterUseCaseResponse> {

        const water = await this.waterRepository.delete(
            id
        );

        if(!water){
            throw new Error('Error: Water register Not Found.');
        }
    
        return { water };
        }
    }
