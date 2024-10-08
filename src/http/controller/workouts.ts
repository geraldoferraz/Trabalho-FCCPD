import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaWorkoutsRepository } from "../../repositories/prisma/prisma-Workouts-Repository";
import { makeChangesWorkoutUseCase, makeDeleteWorkoutUseCase, makeSearchWorkoutUseCase, makeWorkoutUseCase } from "../../use-cases/factories/make-workout-use-case";
import { SearchWorkoutUseCase } from "../../use-cases/workouts-use-cases/searchWorkouts";

export async function workouts (request: FastifyRequest, response: FastifyReply) {
    const workoutBodySchema = z.object({
        userId: z.string(),
        training: z.enum([
            'Strength',
            'Cardio'
        ]),
        name: z.string(),
        duration: z.number(),
        description: z.string().optional()
    })

    const { userId, training, name, duration, description } = workoutBodySchema.parse(request.body)

    try{
        const workoutUseCase = makeWorkoutUseCase()

        const result = await workoutUseCase.execute({ 
            userId,
            training,
            name,
            duration, 
            description
        })

        response.send({ workout : result.workouts })
    }catch(err){
        const message = (err as Error).message;
        response.status(400).send({ success: false, error: message });
    }
}

export async function updateWorkouts(request: FastifyRequest, response: FastifyReply) {

    const { id } = request.params as { id: string }; 

    const workoutBodySchema = z.object({
        training: z.enum([
            'Strength',
            'Cardio'
        ]).optional(),
        name: z.string(),
        duration: z.number().min(0).optional(),
        description: z.string().optional(),
    });

    const { training, name, duration, description } = workoutBodySchema.parse(request.body)

    try {
        const workoutUseCase = makeChangesWorkoutUseCase();
        const result = await workoutUseCase.update({ id, training, name, duration, description });

        response.status(200).send(result)
    } catch (err) {
        const message = (err as Error).message;
        response.status(500).send({ success: false, error: message });
    }
}

export async function deleteWorkouts(request: FastifyRequest, response: FastifyReply) {

    const { id } = request.params as { id: string }; 

    try {
        const workoutUseCase = makeDeleteWorkoutUseCase();
        const result = await workoutUseCase.delete({ id });

        response.status(200).send('Workout record successfully deleted!')
    } catch (err) {
        const message = (err as Error).message;
        response.status(500).send({ success: false, error: message });
    }
}

export async function getAllWorkoutsByUser(request: FastifyRequest, response: FastifyReply) {

    const { userId } = request.params as { userId: string };

    try {
        const workoutsRepository = new PrismaWorkoutsRepository();
        const searchWorkoutUseCase = new SearchWorkoutUseCase(workoutsRepository);

        const workouts = await searchWorkoutUseCase.execute({ userId });

        response.status(200).send(workouts)
        
    } catch (error) {
        response.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
}