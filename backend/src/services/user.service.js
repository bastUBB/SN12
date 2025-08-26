import User from "../models/user.model.js";
import { comparePassword, hashPassword } from '../helpers/bcrypt.helper.js';

export async function createUserService(dataUser) {
    try {
        const { rut, email } = dataUser;

        const rutExist = await User.findOne({ rut });

        if (rutExist) return [null, 'El rut que desea ingresar, ya se encuentra registrado'];

        const emailExist = await User.findOne({ email });

        if (emailExist) return [null, 'El correo electrónico que desea ingresar, ya se encuentra registrado'];

        const hashedPassword = await hashPassword(dataUser.password);

        const newUser = new User({ ...dataUser, password: hashedPassword });

        if (!newUser) return [null, 'Error al crear el usuario'];

        const userSaved = await newUser.save();

        return [userSaved, null];

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        console.error("Error específico:", error.message);
        return [null, 'Error interno del servidor'];
    }
}

export async function getUserByRutService(query) {
    try {
        const { rut } = query;

        const userExist = await User.findOne({ rut });

        if (!userExist) return [null, 'Usuario no encontrado'];

        return [userExist, null];
    } catch (error) {
        console.error('Error al obtener el usuario por RUT:', error);
        return [null, 'Error interno del servidor'];
    }
}

export async function getAllUsersService() {
    try {
        const users = await User.find();

        if (!users || users.length === 0) return [null, 'No se encontraron usuarios'];

        return [users, null];
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        return [null, 'Error interno del servidor'];
    }
}

export async function updateUserService(query, body) {
    try {
        const { rut } = query;

        const userExistQuery = await User.findOne({ rut });

        if (!userExistQuery) return [null, 'Usuario no encontrado'];

        const { rut: nuevoRut, email: nuevoEmail, password: nuevaPassword } = body;

        const existNuevoRut = await User.findOne({ rut: nuevoRut });

        if (existNuevoRut && existNuevoRut.id !== userExistQuery.id) return [null, 'EL nuevo RUT que desea ingresar, ya se encuentra registrado'];

        const existNuevoEmail = await User.findOne({ email: nuevoEmail });

        if (existNuevoEmail && existNuevoEmail.id !== userExistQuery.id) return [null, 'EL nuevo correo electrónico que desea ingresar, ya se encuentra registrado'];

        if (nuevaPassword) {

            const esIgual = await comparePassword(nuevaPassword, userExistQuery.password);

            if (!esIgual) {
                nuevaPassword = await hashPassword(nuevaPassword);
            }
        }

        const userUpdated = await User.findOneAndUpdate(
            userExistQuery._id,
            body,
            { new: true }
        );

        if (!userUpdated) return [null, 'Error al actualizar el usuario'];

        return [userUpdated, null];
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}

export async function deleteUserService(query) {
    try {
        const { rut } = query;

        const userExist = await User.findOne({ rut });

        if (!userExist) return [null, 'Usuario no encontrado'];

        const userDeleted = await User.deleteOne({ rut });

        if (!userDeleted) return [null, 'Error al eliminar el usuario'];

        return [userDeleted, null];
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}