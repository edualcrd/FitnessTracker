import db from '../config/db.js';

const WorkoutModel = {
    // Crear Rutina
    async create(userId, { title, description, difficulty }) {
        const query = 'INSERT INTO workouts (user_id, title, description, difficulty) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [userId, title, description, difficulty]);
        return result.insertId;
    },

    // Listar con Filtros (Requisito: Búsqueda y filtros )
    async findAllByUserId(userId, difficultyFilter = null) {
        let query = 'SELECT * FROM workouts WHERE user_id = ?';
        const params = [userId];

        if (difficultyFilter) {
            query += ' AND difficulty = ?';
            params.push(difficultyFilter);
        }
        
        query += ' ORDER BY created_at DESC';
        const [rows] = await db.execute(query, params);
        return rows;
    },

    // Ver Detalle (Requisito: Ver detalle [cite: 97])
    async findById(id) {
        const query = 'SELECT * FROM workouts WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },

    // Editar (Requisito: Editar [cite: 98])
    async update(id, { title, description, difficulty }) {
        const query = 'UPDATE workouts SET title = ?, description = ?, difficulty = ? WHERE id = ?';
        const [result] = await db.execute(query, [title, description, difficulty, id]);
        return result;
    },

    // Eliminar (Requisito: Eliminar [cite: 99])
    async delete(id) {
        const query = 'DELETE FROM workouts WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
};

export default WorkoutModel;