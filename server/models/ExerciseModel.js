import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    workout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Exercise = mongoose.model('Exercise', exerciseSchema);

const ExerciseModel = {
    async add(workoutId, { name, sets, reps }) {
        const exercise = new Exercise({ workout_id: workoutId, name, sets, reps });
        await exercise.save();
        return exercise;
    },

    async getByWorkoutId(workoutId) {
        return await Exercise.find({ workout_id: workoutId });
    },
    
    async delete(id) {
        return await Exercise.findByIdAndDelete(id);
    }
};

export default ExerciseModel;
export { Exercise };