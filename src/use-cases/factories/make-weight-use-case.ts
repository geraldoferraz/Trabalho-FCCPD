import { CreateWeightUseCase } from "../weight-use-cases/create-weight"
import { PrismaWeightRepository } from '../../repositories/prisma/prisma-weight-repository'

export function makeWeightUseCase(){
        const prismaWeightRepository = new PrismaWeightRepository()
        const weightsUseCase = new CreateWeightUseCase(prismaWeightRepository)

        return weightsUseCase
}