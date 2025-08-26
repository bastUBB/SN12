import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import jwt from "jsonwebtoken";

const toSafeUser = (u) => {
    const o = u.toObject?.() ?? JSON.parse(JSON.stringify(u));
    delete o.password;
    return o;
};

export async function registerUserService(dataUser) {
    try {
        const { rut, email, password } = dataUser;

        const existeRut = await User.findOne({ rut });

        if (existeRut) return [null, "El RUT ya está registrado"];

        const existeEmail = await User.findOne({ email });

        if (existeEmail) return [null, "El correo electrónico ya está registrado"];

        const hashed = await hashPassword(password);

        const user = await User.create({ ...dataUser, password: hashed });

        return [toSafeUser(user), null];
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return [null, 'Error interno del servidor'];
    }
}

export async function loginUserService(dataUser) {
  try {
    const { email, password } = dataUser;

    const user = await User.findOne({ email });

    if (!user) return [null, "Usuario o contraseña inválidos"];

    const ok = await comparePassword(password, user.password);

    if (!ok) return [null, "Usuario o contraseña inválidos"];

    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("JWT_SECRET no configurado");

    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "1d" });

    const userResponse = toSafeUser(user);

    return [{ user: userResponse, token }, null];

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return [null, 'Error interno del servidor'];
  }
}

export async function getProfileService(userId) {
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) return [null, "Usuario no encontrado"];

    return [user, null];

  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    return [null, 'Error interno del servidor'];
  }
}

