import db from '../config/db.js';

const ExerciseModel = {
    async add(workoutId, { name, sets, reps }) {
        const query = 'INSERT INTO exercises (workout_id, name, sets, reps) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [workoutId, name, sets, reps]);
        return result;
    },

    async getByWorkoutId(workoutId) {
        const query = 'SELECT * FROM exercises WHERE workout_id = ?';
        const [rows] = await db.execute(query, [workoutId]);
        return rows;
    },
    
    async delete(id) {
        const query = 'DELETE FROM exercises WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
};

export default ExerciseModel;