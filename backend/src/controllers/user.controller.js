import {
    createUserService,
    getUserByRutService,
    getAllUsersService,
    updateUserService,
    deleteUserService
} from '../services/user.service.js';
import { userQueryValidation, userCreateValidation, userUpdateValidation } from '../validations/user.validation.js';
import { handleSuccess, handleErrorClient, handleErrorServer } from '../handlers/responseHandlers.js';

export async function createUser(req, res) {
    try {        
        const { value: valueBody, error: errorBody } = userCreateValidation.validate(req.body);

        if (errorBody) return handleErrorClient(res, 400, "Error de validacion", errorBody.message);

        const [newUser, errorNewUser] = await createUserService(valueBody);

        if (errorNewUser) return handleErrorServer(res, 400, "Error al crear el usuario", errorNewUser);

        return handleSuccess(res, 201, "Usuario registrado con éxito", newUser);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}

export async function getUserByRut(req, res) {
    try {
        const { value, errorQuery } = userQueryValidation.validate(req.query);

        if (errorQuery) return handleErrorClient(res, 400, "Error de validacion", errorQuery.message);

        const [user, errorUser] = await getUserByRutService(value);

        if (errorUser) return handleErrorServer(res, 404, "Usuario no encontrado", errorUser);

        return handleSuccess(res, 200, "Usuario encontrado", user);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}

export async function getAllUsers(req, res) {
    try {
        const [users, errorUsers] = await getAllUsersService();

        if (errorUsers) return handleErrorServer(res, 404, "No se encontraron usuarios registrados", errorUsers);

        return handleSuccess(res, 200, "Usuarios encontrados", users);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}

export async function updateUser(req, res) {
    try {
        const { valueQuery, errorQuery } = userQueryValidation.validate(req.query);

        if (errorQuery) return handleErrorClient(res, 400, "Error de validacion", errorQuery.message);

        const { valueBody, errorBody } = userUpdateValidation.validate(req.body);

        if (errorBody) return handleErrorClient(res, 400, "Error de validacion", errorBody.message);

        const [updatedUser, errorUpdatedUser] = await updateUserService(valueQuery, valueBody);

        if (errorUpdatedUser) return handleErrorServer(res, 404, "Error al actualizar el usuario", errorUpdatedUser);

        return handleSuccess(res, 200, "Usuario actualizado con éxito", updatedUser);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}

export async function deleteUser(req, res) {
    try {
        const { value, errorQuery } = userQueryValidation.validate(req.query);

        if (errorQuery) return handleErrorClient(res, 400, "Error de validacion", errorQuery.message);

        const [deletedUser, errorDeletedUser] = await deleteUserService(value);

        if (errorDeletedUser) return handleErrorServer(res, 404, "Error al eliminar el usuario", errorDeletedUser);

        return handleSuccess(res, 200, "Usuario eliminado con éxito", deletedUser);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}