import { Prisma, Weight } from "@prisma/client";
import { WeightRepository } from "../../repositories/prisma/weight-repository";

export interface CreateWeightUseCaseRequest {
  userId: string;
  currentWeight: number;
  targetWeight?: number;
}

interface RegisterUseCaseResponse {
    weight: Weight;
    message: string;  // Incluir a propriedade 'message' para armazenar mensagens de feedback
}

export class CreateWeightUseCase {
  constructor(private weightRepository: WeightRepository) {}

  async execute({ userId, currentWeight, targetWeight }: CreateWeightUseCaseRequest): Promise<RegisterUseCaseResponse> {
    let finalTargetWeight: number | undefined = targetWeight;

    if (targetWeight === undefined) {
        const lastWeight = await this.weightRepository.findLastByUserId(userId);
        finalTargetWeight = lastWeight?.targetWeight ? Number(lastWeight.targetWeight) : undefined;
    }

    const weight = await this.weightRepository.create({
        user: {
            connect: { id: userId }
        },
        currentWeight: currentWeight,
        targetWeight: finalTargetWeight ? new Prisma.Decimal(finalTargetWeight) : undefined
    });

    if (!weight) {
        throw new Error('Error: Invalid Params For Create Weight.');
    }

    const successMessage = weight.currentWeight.equals(weight.targetWeight ?? new Prisma.Decimal(0))
        ? "Você alcançou seu peso alvo! Vamos em busca da próxima meta?"
        : "Peso registrado com sucesso.";

    return { weight, message: successMessage };
  }
}
