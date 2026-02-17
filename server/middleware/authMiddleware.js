import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    try {
        // El token suele venir como "Bearer <token>", así que quitamos el "Bearer "
        const cleanToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
        
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos el ID del usuario en la petición
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};