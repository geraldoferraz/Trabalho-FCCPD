import { CreateWeightUseCase } from "../weight-use-cases/create-weight"
import { PrismaWeightRepository } from '../../repositories/prisma/prisma-weight-repository'
import { WeightChangesUseCase } from "../weight-use-cases/update-weight"
import { WeightDeleteUseCase } from "../weight-use-cases/delete-weight"

export function makeWeightUseCase(){
        const prismaWeightRepository = new PrismaWeightRepository()
        const weightsUseCase = new CreateWeightUseCase(prismaWeightRepository)

        return weightsUseCase
}

export function makeWeightUpdateUseCase(){
    const prismaWeightRepository = new PrismaWeightRepository()
    const weightsUseCase = new WeightChangesUseCase(prismaWeightRepository)

    return weightsUseCase
}

export function makeWeightDeleteUseCase(){
    const prismaWeightRepository = new PrismaWeightRepository()
    const weightsUseCase = new WeightDeleteUseCase(prismaWeightRepository)

    return weightsUseCase
}