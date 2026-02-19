import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import connectDB from './config/db.js';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

// Solución para problemas de resolución DNS con SRV de MongoDB Atlas en redes locales
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (error) {
    console.error('Error configurando servidores DNS:', error);
}

const app = express();
// Configuración para __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar a la base de datos
connectDB();


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