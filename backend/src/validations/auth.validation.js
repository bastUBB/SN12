import joi from 'joi';

const domainEmailValidator = (value, helper) => {
    const domainRegex = /@(gmail\.cl)$/;
    if (!domainRegex.test(value)) return helper.message("El correo electrónico debe finalizar en @gmail.cl");
    return value;
};

export const registerValidation = joi.object({
    nombreCompleto: joi.string()
        .required()
        .min(15)
        .max(50)
        .trim()
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.base": "El nombre completo debe ser de tipo string.",
            "string.empty": "El nombre completo no puede estar vacío.",
            "string.min": "El nombre completo debe tener como mínimo 15 caracteres.",
            "string.max": "El nombre completo debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El nombre completo solo puede contener letras y espacios.",
            "any.required": "El nombre completo es obligatorio.",
        }),
    rut: joi.string()
        .required()
        .min(9)
        .max(12)
        .trim()
        .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
        .messages({
            "string.base": "El rut debe ser de tipo string.",
            "string.empty": "El rut no puede estar vacío.",
            "string.min": "El rut debe tener como mínimo 9 caracteres.",
            "string.max": "El rut debe tener como máximo 12 caracteres.",
            "string.pattern.base": "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
            "any.required": "El rut es obligatorio.",
        }),
    email: joi.string()
        .required()
        .min(15)
        .max(50)
        .email()
        .trim()
        .custom(domainEmailValidator, 'Validación de dominio de correo electrónico')
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "string.base": "El correo electrónico debe ser de tipo string.",
            "string.min": "El correo electrónico debe tener como mínimo 15 caracteres.",
            "string.max": "El correo electrónico debe tener como máximo 50 caracteres.",
            "string.email": "El correo electrónico debe ser válido.",
            "any.custom": "El correo electrónico debe finalizar en @gmail.cl, @ubiobio.cl o @alumnos.ubiobio.cl.",
            "any.required": "El correo electrónico es obligatorio.",
        }),
    password: joi.string()
        .required()
        .min(6)
        .max(26)
        .pattern(/^[a-zA-Z0-9]+$/)
        .messages({
            "string.empty": "La contraseña no puede estar vacía.",
            "string.base": "La contraseña debe ser de tipo string.",
            "string.min": "La contraseña debe tener como mínimo 6 caracteres.",
            "string.max": "La contraseña debe tener como máximo 26 caracteres.",
            "string.pattern.base": "La contraseña solo puede contener letras y números.",
            "any.required": "La contraseña es obligatoria.",
        }),
    role: joi.string()
        .valid("Estudiante", "Alumno", "Docente", "Personal", "Trabajador", "Administrador")
        .required()
        .messages({
            "string.empty": "El role no puede estar vacío.",
            "any.only": "El role debe ser uno de los siguientes: Estudiante, Alumno, Docente, Personal, Trabajador o Administrador.",
            "any.required": "El role es obligatorio.",
        }),
})
    .unknown(false)
    .messages({
        'object.unknown': 'No se permiten propiedades adicionales en el cuerpo de la solicitud',
        'object.missing': 'Debe proporcionar todos los campos: nombreCompleto, rut, email, password y role',
    });


export const loginValidation = joi.object({
    email: joi.string()
        .required()
        .min(15)
        .max(50)
        .email()
        .trim()
        .custom(domainEmailValidator, 'Validación de dominio de correo electrónico')
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "string.base": "El correo electrónico debe ser de tipo string.",
            "string.min": "El correo electrónico debe tener como mínimo 15 caracteres.",
            "string.max": "El correo electrónico debe tener como máximo 50 caracteres.",
            "string.email": "El correo electrónico debe ser válido.",
            "any.custom": "El correo electrónico debe finalizar en @gmail.cl, @ubiobio.cl o @alumnos.ubiobio.cl.",
            "any.required": "El correo electrónico es obligatorio.",
        }),
    password: joi.string()
        .required()
        .min(6)
        .max(26)
        .pattern(/^[a-zA-Z0-9]+$/)
        .messages({
            "string.empty": "La contraseña no puede estar vacía.",
            "string.base": "La contraseña debe ser de tipo string.",
            "string.min": "La contraseña debe tener como mínimo 6 caracteres.",
            "string.max": "La contraseña debe tener como máximo 26 caracteres.",
            "string.pattern.base": "La contraseña solo puede contener letras y números.",
            "any.required": "La contraseña es obligatoria.",
        }),
})
    .unknown(false)
    .messages({
        'object.unknown': 'No se permiten propiedades adicionales en el cuerpo de la solicitud',
        'object.missing': 'Debe proporcionar todos los campos: email y password',
    });