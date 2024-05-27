import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaGetUsersRepository } from "../../repositories/prisma/prisma-Users-Repository";
import { RegisterUseCase } from "../../use-cases/user-use-cases/register";
import { makeDeleteRegisterUseCase, makeRegisterUseCase, makeUpdateRegisterUseCase } from "../../use-cases/factories/make-register-use-case";

interface Params {
    id: string
}

interface emailParams {
    email: string
}

export async function register(request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5),
        age: z.number(),
    });

    const { name, email, password, age } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase();

        const { user } = await registerUseCase.execute({
            name,
            email,
            password,
            age,
        });

        response.status(200).send( user.id );

    } catch (err) {
        response.status(400).send({ message: 'Email already exists. Try with another email.' });
    }
}


export async function getUserById (request: FastifyRequest<{ Params: Params }>, response: FastifyReply) {
        const { id }  = request.params; 
        console.log("ID recebido:", id);
    
        const getUsersRepository = new PrismaGetUsersRepository();
        const getRegister = new RegisterUseCase(getUsersRepository);
    
        try {
            const user = await getRegister.executeExplorerById({ id });
            response.status(200).send({ user });

        } catch (error) {
            response.status(404).send({ error: 'User Not Found.'});
        }
}

export async function getUserByEmail (request: FastifyRequest<{Params: emailParams}>, response: FastifyReply){
    const { email } = request.params;

    const getUsersRepository = new PrismaGetUsersRepository();
    const getRegister = new RegisterUseCase(getUsersRepository);

    try {
        const user = await getRegister.executeExplorerByEmail({ email });
        response.status(200).send({ user });

    } catch (error) {
        response.status(404).send({ error: 'User Not Found.'});
    }
}

export async function getAllUsers (request:FastifyRequest, response: FastifyReply){
    const getUsersRepository = new PrismaGetUsersRepository();
    const getRegister = new RegisterUseCase(getUsersRepository);

    try {
        const users = await getRegister.executeExplorerForAllUsers();
        response.status(200).send({ users });

    } catch (error) {
        response.status(404).send({ error: 'Users Not Found.'});
    }
}

export async function deleteUsers(request: FastifyRequest, response: FastifyReply) {

    const { id } = request.params as { id: string }; 

    try {
        const register = makeDeleteRegisterUseCase();
        const result = await register.delete({ id });

        response.status(200).send('Usuário deletado com sucesso!')
    } catch (err) {
        const message = (err as Error).message;
        response.status(500).send({ success: false, error: message });
    }
}

export async function updateUsers(request: FastifyRequest, response: FastifyReply) {

    const { id } = request.params as { id: string }; 

    const UsersBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        password: z.string().min(5).optional(),
        age: z.number().optional(),
    });

    const { name, email, password, age } = UsersBodySchema.parse(request.body)

    try {
        const register = makeUpdateRegisterUseCase();
        const result = await register.update({ id, name, email, password, age });

        response.status(200).send({ result })
    } catch (err) {
        const message = (err as Error).message;
        response.status(500).send({ success: false, error: message });
    }
}