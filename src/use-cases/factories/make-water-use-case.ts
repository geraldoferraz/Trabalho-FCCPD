import { WaterUseCase } from "../water-use-cases/create-water"

import { PrismaWaterRepository } from '../../repositories/prisma/prisma-Water-repository'
import { WaterDeleteUseCase } from "../water-use-cases/delete-water"
import { WaterChangesUseCase } from "../water-use-cases/update-water"

export function makeWaterUseCase(){
        const prismaWaterRepository = new PrismaWaterRepository()
        const waterUseCase = new WaterUseCase(prismaWaterRepository)

        return waterUseCase
}

export function makeWaterChangesUseCase(){
    const prismaWaterRepository = new PrismaWaterRepository()
    const waterUseCase = new WaterChangesUseCase(prismaWaterRepository)

    return waterUseCase
}


export function makeDeleteWaterUseCase(){
    const prismaWaterRepository = new PrismaWaterRepository()
    const waterDeleteUseCase = new WaterDeleteUseCase(prismaWaterRepository)

    return waterDeleteUseCase
}

// WaterChangesUseCase