import WorkoutModel from "../models/WorkoutModel.js";
import ExerciseModel from "../models/ExerciseModel.js";

// Listar todas las rutinas del usuario (Dashboard)
export const getMyWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { difficulty } = req.query; // Capturamos el filtro de la URL (?difficulty=Hard)
    const workouts = await WorkoutModel.findAllByUserId(userId, difficulty);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener rutinas" });
  }
};

// Crear nueva rutina
export const createWorkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, difficulty } = req.body;

    if (!title)
      return res.status(400).json({ message: "El título es obligatorio" });

    const workoutId = await WorkoutModel.create(userId, {
      title,
      description,
      difficulty,
    });
    res.status(201).json({ message: "Rutina creada", workoutId });
  } catch (error) {
    res.status(500).json({ message: "Error al crear rutina" });
  }
};

// Obtener detalle (Rutina + Ejercicios)
export const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await WorkoutModel.findById(id);

    if (!workout)
      return res.status(404).json({ message: "Rutina no encontrada" });

    // Seguridad: Verificar que la rutina pertenece al usuario logueado
    if (workout.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para ver esta rutina" });
    }

    // Obtener los ejercicios asociados (Relación)
    const exercises = await ExerciseModel.getByWorkoutId(id);

    res.json({ ...workout, exercises }); // Devolvemos todo junto
  } catch (error) {
    res.status(500).json({ message: "Error al obtener detalle" });
  }
};
export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, difficulty } = req.body;

    // Verificar que existe y pertenece al usuario
    const workout = await WorkoutModel.findById(id);
    if (!workout)
      return res.status(404).json({ message: "Rutina no encontrada" });
    if (workout.user_id !== req.user.id)
      return res.status(403).json({ message: "No autorizado" });

    await WorkoutModel.update(id, { title, description, difficulty });
    res.json({ message: "Rutina actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar rutina" });
  }
};
// Eliminar Rutina
export const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await WorkoutModel.findById(id);

    if (!workout)
      return res.status(404).json({ message: "Rutina no encontrada" });
    if (workout.user_id !== req.user.id)
      return res.status(403).json({ message: "No autorizado" });

    await WorkoutModel.delete(id); // Al borrar la rutina, MySQL borra los ejercicios por ON DELETE CASCADE
    res.json({ message: "Rutina eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
};

// Agregar ejercicio a una rutina existente
export const addExercise = async (req, res) => {
  try {
    const { id } = req.params; // ID de la rutina
    const { name, sets, reps } = req.body;

    // Verificar propiedad
    const workout = await WorkoutModel.findById(id);
    if (workout.user_id !== req.user.id)
      return res.status(403).json({ message: "No autorizado" });

    await ExerciseModel.add(id, { name, sets, reps });
    res.status(201).json({ message: "Ejercicio agregado" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar ejercicio" });
  }
};
