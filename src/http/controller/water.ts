import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeDeleteWaterUseCase, makeWaterChangesUseCase, makeWaterUseCase } from "../../use-cases/factories/make-water-use-case";
import { makeWeightUpdateUseCase } from "../../use-cases/factories/make-weight-use-case";
import { Decimal } from "@prisma/client/runtime/library";

export async function createWater(request: FastifyRequest, response: FastifyReply) {

    const waterIdBodySchema = z.object({
        userId: z.string()
    });

    const waterBodySchema = z.object({
        amount: z.string().refine((val) => {
          try {
            new Decimal(val);
            return true;
          } catch {
            return false;
          }
        }, {
          message: 'Amount must be a valid decimal number'
        })
      });

    const { userId } = waterIdBodySchema.parse(request.params);
    const { amount } = waterBodySchema.parse(request.body);

    try {
        const waterUseCase = makeWaterUseCase();

        const result = await waterUseCase.execute({
            userId,
            amount: new Decimal(amount)
        });

        response.send({
            success: 'New water registered successfully',
            data: result.water,
        });
    } catch (err) {
        const message = (err as Error).message;
        response.status(400).send({ success: false, error: message });
    }
}

export async function explorerWaters(request: FastifyRequest, response: FastifyReply) {

    const waterBodySchema = z.object({
        userId: z.string()
    });

    const { userId } = waterBodySchema.parse(request.params);

    try {
        const waterUseCase = makeWaterUseCase();
        const results = await waterUseCase.executeExplorerForAllWeights({ userId })

        response.status(200).send(results)
    } catch (err) {
        const message = (err as Error).message;
        response.status(400).send({ success: false, error: message });
    }
}

export async function deleteWater(request: FastifyRequest, response: FastifyReply) {

    const { id } = request.params as { id: string }; 

    try {
        const waterUseCase = makeDeleteWaterUseCase();
        const result = await waterUseCase.delete({ id });

        response.status(200).send('Water record successfully deleted')
    } catch (err) {
        const message = (err as Error).message;
        response.status(500).send({ success: false, error: message });
    }
}

export async function updateWater(request: FastifyRequest, response: FastifyReply) {

    const waterIdBodySchema = z.object({
        id: z.string()
    });

    const waterBodySchema = z.object({
        amount: z.string().refine((val) => {
          try {
            new Decimal(val);
            return true;
          } catch {
            return false;
          }
        }, {
          message: 'Amount must be a valid decimal number'
        })
      });

    const { id } = waterIdBodySchema.parse(request.params);
    const { amount } = waterBodySchema.parse(request.body)

    try {
        const waterUseCase = makeWaterChangesUseCase();
        const result = await waterUseCase.update({ id, amount: new Decimal(amount) });

        response.send({
            success: 'New updated done',
            data: result.water
        });
    } catch (err) {
        const message = (err as Error).message;
        response.status(500).send({ success: false, error: message });
    }
}