import fastify from "fastify";
import { PrismaClient} from '@prisma/client'
import { appRoutes } from "./http/routes";
import { env } from "./env";
import { ZodError } from "zod";


const prisma = new PrismaClient() //criando conexao com o banco do prisma 
export const app = fastify()

app.register(appRoutes)

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