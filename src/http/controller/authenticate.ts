import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case";

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(5)
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const { user } = await authenticateUseCase.execute({ email, password });

        return response.status(200).send({ id: user.id })
    } catch (err) {
        return response.status(400).send('Internal Server Error.');
    }
}
