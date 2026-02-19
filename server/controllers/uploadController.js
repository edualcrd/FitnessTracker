import multer from 'multer';
import path from 'path';
import { User } from '../models/UserModel.js';

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Nombre único: id_usuario + fecha + extensión
        cb(null, `user-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
};

export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2000000 }, // Límite 2MB
    fileFilter: fileFilter 
});

export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se subió ningún archivo' });
        }

        // Guardar la ruta en la base de datos
        // Nota: En Windows las rutas usan backslash (\), las cambiamos a slash (/) para web
        const avatarPath = req.file.path.replace(/\\/g, "/"); 

        await User.findByIdAndUpdate(req.user.id, { avatar: avatarPath });

        res.json({ message: 'Avatar actualizado', avatar: avatarPath });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir la imagen' });
    }
};