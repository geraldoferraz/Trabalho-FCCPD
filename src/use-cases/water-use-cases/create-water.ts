import { Prisma, Water } from "@prisma/client";
import { WaterRepository } from "../../repositories/prisma/water-repository";
import { Decimal } from "@prisma/client/runtime/library";

export interface CreateWaterUseCaseRequest {
  userId: string;
  amount: Decimal;
}

export interface WaterRegisterRequest {
    userId: string;
}

interface RegisterUseCaseResponse {
    water: Water;
}

export class WaterUseCase {
  constructor(private waterRepository: WaterRepository) {}

  async execute({ userId, amount }: CreateWaterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const water = await this.waterRepository.create({
        user: {
            connect: { id: userId }
        },
        amount
    })

    return { water }
  }

    async executeExplorerForAllWeights({ userId }:WaterRegisterRequest){

        const waters = await this.waterRepository.findAllByUser(userId);

        if(!waters){
            throw new Error('No waters register found.')
        }

        return waters;
    }
}
