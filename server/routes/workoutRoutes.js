import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
    getMyWorkouts, 
    createWorkout, 
    getWorkoutById, 
    deleteWorkout, 
    addExercise,
    updateWorkout
} from '../controllers/workoutController.js';

const router = express.Router();

// Todas estas rutas requieren estar logueado
router.use(verifyToken);

router.get('/', getMyWorkouts);           // GET /api/workouts
router.post('/', createWorkout);          // POST /api/workouts
router.get('/:id', getWorkoutById);       // GET /api/workouts/1 (Detalle + Ejercicios)
router.put('/:id', updateWorkout);        // PUT /api/workouts/1 (Actualizar rutina)
router.delete('/:id', deleteWorkout);
     // DELETE /api/workouts/1
router.post('/:id/exercises', addExercise); // POST /api/workouts/1/exercises (Crear entidad secundaria)

export default router;  