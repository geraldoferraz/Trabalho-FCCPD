import { FastifyInstance } from "fastify"
import { register, getUserById, getUserByEmail, getAllUsers, deleteUsers, updateUsers } from "./controller/register"
import { workouts, getAllWorkoutsByUser, updateWorkouts, deleteWorkouts, searchWorkoutsByIdAndTrainingType } from "./controller/workouts"
import { createWeight } from "./controller/weight";

const fastify = require('fastify')({ logger: true });

export async function appRoutes(app: FastifyInstance){
    app.post('/users', register)
    app.get('/users/id/:id', getUserById)
    app.get('/users/email/:email', getUserByEmail)
    app.get('/users', getAllUsers)
    app.put('/users/:id', updateUsers)
    app.delete('/users/:id', deleteUsers)

    //--------------------- WORKOUTS ----------------------------//

    app.post('/workouts', workouts)
    app.get('/workouts/:userId', getAllWorkoutsByUser)
    app.get('/workouts/:userId/:trainingType', searchWorkoutsByIdAndTrainingType)
    app.put('/workouts/:id', updateWorkouts)
    app.delete('/workouts/:id', deleteWorkouts)

    //--------------------- WEIGHTS ----------------------------//

    app.post('/weights/:userId', createWeight)
}