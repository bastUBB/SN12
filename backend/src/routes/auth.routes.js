import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router
    .post('/register', registerUser)
    .post('/login', loginUser)
    .get('/profile', authenticateJWT, (req, res) => { res.json(req.user) })
    .post('/logout', (req, res) => { res.clearCookie('token').json({ message: 'Sesión cerrada' }) });

export default router;