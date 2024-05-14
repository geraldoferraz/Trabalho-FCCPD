import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeWeightUseCase } from "../../use-cases/factories/make-weight-use-case";

export async function createWeight(request: FastifyRequest, response: FastifyReply) {
    const weightIdBodySchema = z.object({
        userId: z.string()
    });
    
    const weightBodySchema = z.object({
        currentWeight: z.number(),
        targetWeight: z.number().optional()
    });

    const { userId } = weightIdBodySchema.parse(request.params);
    const { currentWeight, targetWeight } = weightBodySchema.parse(request.body);

    try {
        const weightUseCase = makeWeightUseCase();
        const result = await weightUseCase.execute({
            userId,
            currentWeight,
            targetWeight
        });

        // Enviar resposta com dados de peso e mensagem
        response.send({
            success: 'New weight registered successfully',
            data: result.weight,
            message: result.message  // Incluir a mensagem de sucesso ou de parabéns
        });
    } catch (err) {
        const message = (err as Error).message;
        response.status(400).send({ success: false, error: message });
    }
}
