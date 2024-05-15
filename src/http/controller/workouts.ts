import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaWorkoutsRepository } from "../../repositories/prisma/prisma-Workouts-Repository";
import { makeChangesWorkoutUseCase, makeDeleteWorkoutUseCase, makeSearchWorkoutByUseCase, makeSearchWorkoutUseCase, makeWorkoutUseCase } from "../../use-cases/factories/make-workout-use-case";
import { SearchWorkoutUseCase } from "../../use-cases/workouts-use-cases/searchWorkouts";

export async function workouts (request: FastifyRequest, response: FastifyReply) {
    const workoutBodySchema = z.object({
        userId: z.string(),
        training: z.enum([
            'Peito',
            'Triceps',
            'Costas',
            'Biceps',
            'Ombro',
            'Perna',
            'Posterior_de_coxa',
            'Gluteo',
            'DayOff'
        ]),
        cardio_minutes: z.number(),
        details: z.string().optional()
    })

    const { userId, training, cardio_minutes, details } = workoutBodySchema.parse(request.body)

    try{
        const workoutUseCase = makeWorkoutUseCase()

        const result = await workoutUseCase.execute({ 
            userId,
            training,
            cardio_minutes, 
            details
        })

        response.send({ success: 'New Workout successfully created', data: result.workouts })
    }catch(err){
        const message = (err as Error).message;
        response.status(400).send({ success: false, error: message });
    }
}

export async function updateWorkouts(request: FastifyRequest, response: FastifyReply) {

    const { id } = request.params as { id: string }; 

    const workoutBodySchema = z.object({
        training: z.enum([
            'Peito',
            'Triceps',
            'Costas',
            'Biceps',
            'Ombro',
            'Perna',
            'Posterior_de_coxa',
            'Gluteo',
            'DayOff'
        ]).optional(),
        cardio_minutes: z.number().min(0).optional(),
        details: z.string().optional(),
    });

    const { training, cardio_minutes, details } = workoutBodySchema.parse(request.body)

    try {
        const workoutUseCase = makeChangesWorkoutUseCase();
        const result = await workoutUseCase.update({ id, training, cardio_minutes, details });

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

export async function searchWorkoutsByIdAndTrainingType(request: FastifyRequest, response: FastifyReply) {

    const userIdParamSchema = z.object({
      userId: z.string(),
    });
  
    const trainingTypeParamSchema =
      z.object({
        trainingType: z.enum([
          "Peito",
          "Triceps",
          "Costas",
          "Biceps",
          "Ombro",
          "Perna",
          "Posterior_de_coxa",
          "Gluteo",
          "DayOff",
        ]),
      });
  
    const { userId } = userIdParamSchema.parse(request.params);
    const { trainingType } = trainingTypeParamSchema.parse(request.params);

  
    try {
      const searchWorkoutUseCase = makeSearchWorkoutByUseCase();
  
      const workouts = await searchWorkoutUseCase.execute({ userId, trainingType });
  
      response.status(200).send(workouts);
    } catch (error) {
      response.status(404).send({
        message: "Workouts Not Found.",
      });
    }
  }
  