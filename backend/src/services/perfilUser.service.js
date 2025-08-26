import perfilUser from "../models/perfilUser.model.js";
import User from "../models/user.model.js";

export async function createPerfilUserService(dataUser) {
    try {
        const { rutUser, proyectos, actividades } = dataUser;

        const rutExist = await User.findOne({ rut: rutUser });

        if (!rutExist) return [null, 'El rut que desea ingresar, no se encuentra registrado'];

        const perfilUserExist = await perfilUser.findOne({ rutUser });

        if (perfilUserExist) return [null, 'El usuario ya cuenta con un perfil'];

        const newPerfilUser = new perfilUser({
            rutUser,
            proyectos: proyectos || [],
            actividades: actividades || []
        });

        await newPerfilUser.save();

        return [newPerfilUser, null];

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}

export async function getPerfilUserByRutService(query) {
    try {
        const { rutUser } = query;

        const userExist = await User.findOne({ rut: rutUser });

        if (!userExist) return [null, 'El rut del usuario que desea ingresar, no se encuentra registrado'];

        const perfilUserData = await perfilUser.findOne({ rutUser });

        if (!perfilUserData) return [null, 'No se encontró el perfil del usuario'];

        return [perfilUserData, null];

    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}

export async function updatePerfilUserService(query, body) {
    try {
        const { rutUser } = query;

        const { proyectos: proyectosBody, actividades: actividadesBody } = body;

        const rutUserExist = await User.findOne({ rut: rutUser });

        if (!rutUserExist) return [null, 'El rut del usuario que desea ingresar, no se encuentra registrado'];

        const perfilUserExist = await perfilUser.findOne({ rutUser });

        if (!perfilUserExist) return [null, 'No se encontró el perfil del usuario'];

        if (perfilUserExist) perfilUserExist.proyectos.includes(proyectosBody) && perfilUserExist.actividades.includes(actividadesBody);

        if (perfilUserExist.modifiedCount === 0) return [null, 'No se realizaron cambios en el perfil del usuario'];

        await perfilUserExist.save();

        return [perfilUserExist, null];
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}

export async function deleteItemsPerfilUserService(query, body) {
    try {
        const { rutUser } = query;

        const { proyectos: proyectosBodyDelete, actividades: actividadesBodyDelete } = body;

        const rutUserExist = await User.findOne({ rut: rutUser });

        if (!rutUserExist) return [null, 'El rut del usuario que desea ingresar, no se encuentra registrado'];

        const perfilUserExist = await perfilUser.findOne({ rutUser });

        if (!perfilUserExist) return [null, 'No se encontró el perfil del usuario'];

        if (perfilUserExist) {
            perfilUserExist.proyectos = perfilUserExist.proyectos.filter(proyecto => !proyectosBodyDelete.includes(proyecto));
            perfilUserExist.actividades = perfilUserExist.actividades.filter(actividad => !actividadesBodyDelete.includes(actividad));
        }

        await perfilUserExist.save();

        return [perfilUserExist, null];
    } catch (error) {
        console.error('Error al eliminar elementos del perfil del usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}