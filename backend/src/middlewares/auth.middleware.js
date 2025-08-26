import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { handleErrorClient, handleErrorServer } from '../handlers/responseHandlers.js';

export const authenticateJWT = async (req, res, next) => {
    try {
        let token = req.cookies?.token;
        
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return handleErrorClient(res, 401, "Acceso denegado", "Token de autenticación requerido");
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'TU_SECRET_KEY');
        
        // Buscar el usuario en la base de datos
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return handleErrorClient(res, 401, "Acceso denegado", "Usuario no encontrado");
        }

        // Agregar la información del usuario a la request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return handleErrorClient(res, 401, "Acceso denegado", "Token inválido");
        }
        if (error.name === 'TokenExpiredError') {
            return handleErrorClient(res, 401, "Acceso denegado", "Token expirado");
        }
        handleErrorServer(res, 500, error.message);
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return handleErrorClient(res, 401, "Acceso denegado", "Usuario no autenticado");
        }

        if (!allowedRoles.includes(req.user.role)) {
            return handleErrorClient(res, 403, "Acceso denegado", `Se requiere uno de los siguientes roles: ${allowedRoles.join(', ')}`);
        }

        next();
    };
};
