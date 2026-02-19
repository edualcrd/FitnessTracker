import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    difficulty: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Workout = mongoose.model('Workout', workoutSchema);

const WorkoutModel = {
    // Crear Rutina
    async create(userId, { title, description, difficulty }) {
        const workout = new Workout({ user_id: userId, title, description, difficulty });
        await workout.save();
        return workout._id; // Equivalent to insertId
    },

    // Listar con Filtros
    async findAllByUserId(userId, difficultyFilter = null) {
        const query = { user_id: userId };
        if (difficultyFilter) {
            query.difficulty = difficultyFilter;
        }
        return await Workout.find(query).sort({ created_at: -1 });
    },

    // Ver Detalle
    async findById(id) {
        return await Workout.findById(id);
    },

    // Editar
    async update(id, { title, description, difficulty }) {
        return await Workout.findByIdAndUpdate(id, { title, description, difficulty }, { new: true });
    },

    // Eliminar
    async delete(id) {
        return await Workout.findByIdAndDelete(id);
    }
};

export default WorkoutModel;
export { Workout };