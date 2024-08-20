import fastify from "fastify";
import { PrismaClient} from '@prisma/client'
import { appRoutes } from "./http/routes";
import { env } from "./env";
import { ZodError } from "zod";
import cors from '@fastify/cors'
import fastifyJwt from "@fastify/jwt";

const prisma = new PrismaClient() //criando conexao com o banco do prisma 
export const app = fastify()

app.register(appRoutes)

app.register(cors, {
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
});

app.setErrorHandler((error, request, response) => {//tratando erros globalmente 
    if(error instanceof ZodError){
        return response
            .status(400)
            .send({ message: 'Validation Error.', issues: error.format() })
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error); 
    } 

    return response.status(500).send({ message: 'Internal Server Error' })
})