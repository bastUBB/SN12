import{
    createPerfilUserService,
    getPerfilUserByRutService,
    updatePerfilUserService,
    deleteItemsPerfilUserService
} from "../services/perfilUser.service.js";
import { perfilUserQueryValidation, perfilUserBodyValidation } from '../validations/perfilUser.validation.js';
import { handleSuccess, handleErrorClient, handleErrorServer } from '../handlers/responseHandlers.js';

export async function createPerfilUser(req, res) {
    try {
        const { value: valueBody, error: errorBody } = perfilUserBodyValidation.validate(req.body);

        if (errorBody) return handleErrorClient(res, 400, "Error de validación", errorBody.message);

        const [newPerfilUser, errorNewPerfilUser] = await createPerfilUserService(valueBody);

        if (errorNewPerfilUser) return handleErrorServer(res, 400, "Error en la creación del perfil de usuario", errorNewPerfilUser);

        handleSuccess(res, 201, "Perfil creado exitosamente", newPerfilUser);
    } catch (error) {
        console.error('Error en createPerfilUser:', error);
        return handleErrorServer(res);
    }
}

export async function getPerfilUserByRut(req, res) {
    try {
        const { value: valueQuery, error: errorQuery } = perfilUserQueryValidation.validate(req.query);

        if (errorQuery) return handleErrorClient(res, 400, "Error de validación", errorQuery.message);

        const [perfilUserData, errorPerfilUserData] = await getPerfilUserByRutService(valueQuery);

        if (errorPerfilUserData) return handleErrorServer(res, 404, "Perfil de usuario no encontrado", errorPerfilUserData);

        return handleSuccess(res, 200, "Perfil de usuario encontrado", perfilUserData);
    } catch (error) {
        console.error('Error en getPerfilUserByRut:', error);
        return handleErrorServer(res);
    }
}

export async function updatePerfilUser(req, res) {
    try {
        const { value: valueQuery, error: errorQuery } = perfilUserQueryValidation.validate(req.query);

        if (errorQuery) return handleErrorClient(res, 400, "Error de validación", errorQuery.message);

        const { value: valueBody, error: errorBody } = perfilUserBodyValidation.validate(req.body);

        if (errorBody) return handleErrorClient(res, 400, "Error de validación", errorBody.message);

        const [updatedPerfilUser, errorUpdatedPerfilUser] = await updatePerfilUserService(valueQuery, valueBody);

        if (errorUpdatedPerfilUser) return handleErrorServer(res, 404, "Error al actualizar el perfil de usuario", errorUpdatedPerfilUser);

        return handleSuccess(res, 200, "Perfil de usuario actualizado con éxito", updatedPerfilUser);
    } catch (error) {
        console.error('Error en updatePerfilUser:', error);
        return handleErrorServer(res);
    }
}

export async function deleteItemsPerfilUser(req, res) {
    try {
        const { value: valueQuery, error: errorQuery } = perfilUserQueryValidation.validate(req.query);

        if (errorQuery) return handleErrorClient(res, 400, "Error de validación", errorQuery.message);

        const { value: valueBody, error: errorBody } = perfilUserBodyValidation.validate(req.body);

        if (errorBody) return handleErrorClient(res, 400, "Error de validación", errorBody.message);

        const [deletedItemsPerfilUser, errorDeletedItemsPerfilUser] = await deleteItemsPerfilUserService(valueQuery, valueBody);

        if (errorDeletedItemsPerfilUser) return handleErrorServer(res, 404, "Error al eliminar elementos del perfil de usuario", errorDeletedItemsPerfilUser);

        return handleSuccess(res, 200, "Elementos del perfil de usuario eliminados con éxito", deletedItemsPerfilUser);
    } catch (error) {
        console.error('Error en deleteItemsPerfilUser:', error);
        return handleErrorServer(res);
    }
}