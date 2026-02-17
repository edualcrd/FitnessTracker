import db from '../config/db.js';

const UserModel = {
    async create(user) {
        // Query para insertar usuario
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [user.username, user.email, user.password]);
        return result;
    },

    async findByEmail(email) {
        // Query para buscar por email (Login)
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    },

    async findById(id) {
        const query = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }
};

export default UserModel;