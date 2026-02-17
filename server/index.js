import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
// Configuración para __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middlewares
app.use(cors()); // Permite peticiones desde React
app.use(express.json()); // Parsea JSON en el body

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});