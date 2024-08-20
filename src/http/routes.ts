import { FastifyInstance } from "fastify"
import { register, getUserById, getUserByEmail, getAllUsers, deleteUsers, updateUsers, getUserRecordsCountController, getUserRecordsWithDetails } from "./controller/register"
import { workouts, getAllWorkoutsByUser, updateWorkouts, deleteWorkouts } from "./controller/workouts"
import { createWeight, deleteWeight, explorerFirstWeightRegister, explorerWeights, updateWeights } from "./controller/weight";
import { calculateWaterIntake, createWater, deleteWater, explorerWaters, updateWater } from "./controller/water";
import { authenticate } from "./controller/authenticate";
import { profile } from "./controller/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

const fastify = require('fastify')({ logger: true });

export async function appRoutes(app: FastifyInstance){
    app.post('/users', register)
    app.post('/sessions', authenticate)

    // authenticated 
    app.get('/me', profile)

    app.get('/users/id/:id', getUserById)
    app.get('/users/email/:email', getUserByEmail)
    app.get('/users', getAllUsers)
    app.get('/users/:userId/records-count', getUserRecordsCountController)
    app.get('/users/:userId/records-details', getUserRecordsWithDetails)
    app.put('/users/:id', updateUsers)
    app.delete('/users/:id', deleteUsers)

    //--------------------- WORKOUTS ----------------------------//

    app.post('/workouts', workouts)
    app.get('/workouts/:userId', getAllWorkoutsByUser)
    app.put('/workouts/:id', updateWorkouts)
    app.delete('/workouts/:id', deleteWorkouts)

    //--------------------- WEIGHTS ----------------------------//

    app.post('/weights/:userId', createWeight)
    app.put('/weights/:id', updateWeights)
    app.get('/weights/:userId', explorerWeights)
    app.get('/weight/:userId', explorerFirstWeightRegister)
    app.delete('/weights/:id', deleteWeight)

    //--------------------- WATER ----------------------------//

    app.post('/water/:userId', createWater)
    app.put('/water/:id', updateWater)
    app.get('/waters/:userId', explorerWaters)
    app.get('/water/:userId', calculateWaterIntake);
    app.delete('/water/:id', deleteWater)
}