import express from 'express';
import { register, login } from '../controllers/authController.js';
import { upload, uploadAvatar } from '../controllers/uploadController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register); // POST /api/auth/register
router.post('/login', login);       // POST /api/auth/login
router.post('/avatar', verifyToken, upload.single('avatar'), uploadAvatar);
export default router;