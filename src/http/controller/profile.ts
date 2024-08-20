import { makeGetUserProfileUseCase } from "../../use-cases/factories/make-get-user-profile";
import { FastifyRequest, FastifyReply } from "fastify";



export async function profile (request: FastifyRequest, response: FastifyReply) {

    //checamos qual o user que esta fazendo a chamada para a rota profile

    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
        userId: request.user.sub
    })

    return response.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    })
}

//colocamos o password hash como undefined pois nao retornamos a senha do user 



