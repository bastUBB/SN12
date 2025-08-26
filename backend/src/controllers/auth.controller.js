import {
    registerUserService,
    loginUserService,
    getProfileService,
} from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";

export async function registerUser(req, res) {
    try {
        const { value: valueBody, error: errorBody } = registerValidation.validate(req.body);

        if (errorBody) return handleErrorClient(res, 400, "Error de validación", errorBody.message);

        const [newUser, errorNewUser] = await registerUserService(valueBody);

        if (errorNewUser) return handleErrorServer(res, 400, "Error al registrar el usuario", errorNewUser);

        return handleSuccess(res, 201, "Usuario registrado con éxito", newUser);
    } catch (error) {
        return handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}

export async function loginUser(req, res) {
    try {
        const { value: valueBody, error: errorBody } = loginValidation.validate(req.body);

        if (errorBody) return handleErrorClient(res, 400, "Error de validación", errorBody.message);

        const [result, errorLogin] = await loginUserService(valueBody);

        if (errorLogin) return handleErrorClient(res, 401, "Credenciales inválidas", errorLogin);

        const { user, token } = result;

        // Set cookie HttpOnly (si usas cookies en web)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",           
            maxAge: 1000 * 60 * 60 * 24, 
            path: "/",
        });

        return handleSuccess(res, 200, "Login exitoso", { user, token });
    } catch (error) {
        return handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}

export async function getProfile(req, res) {
    try {
        const token = req.cookies?.token ||
            (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null);

        if (!token) return handleErrorClient(res, 401, "No autenticado", "No hay token");

        const secret = process.env.JWT_SECRET;

        if (!secret) return handleErrorServer(res, 500, "Error de configuración", "JWT_SECRET no configurado");

        let decoded;

        try {
            decoded = jwt.verify(token, secret);
        } catch (e) {
            return handleErrorClient(res, 401, "Token inválido", e.message);
        }

        const [user, errorUser] = await getProfileService(decoded.id);

        if (errorUser) return handleErrorServer(res, 404, "Usuario no encontrado", errorUser);

        return handleSuccess(res, 200, "Perfil obtenido con éxito", user);
    } catch (error) {
        return handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}
