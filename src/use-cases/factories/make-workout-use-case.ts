import { PrismaWorkoutsRepository } from "../../repositories/prisma/prisma-Workouts-Repository";
import { WorkoutsUseCase } from "../workouts-use-cases/create-workout";
import { WorkoutsDeleteUseCase } from "../workouts-use-cases/delete-workouts";
import { SearchWorkoutByTrainingUseCase } from "../workouts-use-cases/search-workout-by-training";
import { SearchWorkoutUseCase } from "../workouts-use-cases/searchWorkouts";
import { WorkoutsChangesUseCase } from "../workouts-use-cases/update-workouts";

export function makeWorkoutUseCase(){
        const prismaWorkoutsRepository = new PrismaWorkoutsRepository()
        const workoutsUseCase = new WorkoutsUseCase(prismaWorkoutsRepository)

        return workoutsUseCase
}

export function makeChangesWorkoutUseCase(){
    const prismaWorkoutsRepository = new PrismaWorkoutsRepository()
    const workoutsUseCase = new WorkoutsChangesUseCase(prismaWorkoutsRepository)

    return workoutsUseCase
}

export function makeDeleteWorkoutUseCase(){
    const prismaWorkoutsRepository = new PrismaWorkoutsRepository()
    const workoutsUseCase = new WorkoutsDeleteUseCase(prismaWorkoutsRepository)

    return workoutsUseCase
}

export function makeSearchWorkoutUseCase(){
    const prismaWorkoutsRepository = new PrismaWorkoutsRepository()
    const searchWorkoutsUseCase = new SearchWorkoutUseCase(prismaWorkoutsRepository)

    return searchWorkoutsUseCase
}

export function makeSearchWorkoutByUseCase(){
    const prismaWorkoutsRepository = new PrismaWorkoutsRepository()
    const searchWorkoutsUseCase = new SearchWorkoutByTrainingUseCase(prismaWorkoutsRepository)

    return searchWorkoutsUseCase
}
