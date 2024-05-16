import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeWeightDeleteUseCase, makeWeightUpdateUseCase, makeWeightUseCase } from "../../use-cases/factories/make-weight-use-case";

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

export async function explorerWeights(request: FastifyRequest, response: FastifyReply) {

    const weightIdBodySchema = z.object({
        userId: z.string()
    });

    const { userId } = weightIdBodySchema.parse(request.params);

    try {
        const weightUseCase = makeWeightUseCase();
        const results = await weightUseCase.executeExplorerForAllWeights({ userId })

        response.status(200).send(results)
    } catch (err) {
        const message = (err as Error).message;
        response.status(400).send({ success: false, error: message });
    }
}

export async function explorerFirstWeightRegister(request: FastifyRequest, response: FastifyReply) {

    const weightIdBodySchema = z.object({
        userId: z.string()
    });

    const { userId } = weightIdBodySchema.parse(request.params);

    try {
        const weightUseCase = makeWeightUseCase();
        const result = await weightUseCase.executeExplorerForFirstWeightRegister({userId})

        response.status(200).send(result.currentWeight.toNumber())
    } catch (err) {
        const message = (err as Error).message;
        response.status(400).send({ success: false, error: message });
    }
}

export async function updateWeights(request: FastifyRequest, response: FastifyReply) {

    const weightIdBodySchema = z.object({
        id: z.string()
    });

    const weightBodySchema = z.object({
        currentWeight: z.number().optional(),
        targetWeight: z.number().optional()
    })

    const { id } = weightIdBodySchema.parse(request.params);
    const { currentWeight, targetWeight } = weightBodySchema.parse(request.body)

    try {
        const weightUseCase = makeWeightUpdateUseCase();
        const result = await weightUseCase.update({ id, currentWeight, targetWeight });

        response.send({
            success: 'New updated done',
            data: result.weight
        });
    } catch (err) {
        const message = (err as Error).message;
        response.status(500).send({ success: false, error: message });
    }
}

export async function deleteWeight(request: FastifyRequest, response: FastifyReply) {

    const { id } = request.params as { id: string }; 

    try {
        const weightUseCase = makeWeightDeleteUseCase();
        const result = await weightUseCase.delete({ id });

        response.status(200).send('weight record successfully deleted')
    } catch (err) {
        const message = (err as Error).message;
        response.status(500).send({ success: false, error: message });
    }
}

makeWeightDeleteUseCase