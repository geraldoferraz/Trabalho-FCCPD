import { WeightRepository } from "../../repositories/prisma/weight-repository";

export interface CalculateWaterIntakeUseCaseRequest {
  userId: string;
}

export class CalculateWaterIntakeUseCase {
  constructor(private weightRepository: WeightRepository) {}

  async execute({ userId }: CalculateWaterIntakeUseCaseRequest): Promise<number> {
    const lastWeight = await this.weightRepository.findLastByUserId(userId);

    if (!lastWeight) {
      throw new Error('No weight record found for this user.');
    }

    const waterIntake = lastWeight.currentWeight.toNumber() * 0.035;
    return waterIntake;
  }
}
