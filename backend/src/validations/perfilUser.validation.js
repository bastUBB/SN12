import joi from "joi";

export const perfilUserQueryValidation = joi.object({
    rutUser: joi.string()
        .required()
        .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
        .messages({
            "string.empty": "El rut del usuario no puede estar vacío.",
            "string.base": "El rut del usuario debe ser de tipo string.",
            "string.min": "El rut del usuario debe tener como mínimo 9 caracteres.",
            "string.max": "El rut del usuario debe tener como máximo 12 caracteres.",
            "string.pattern.base": "Formato rut del usuario inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
            "any.required": "El rut del usuario es obligatorio.",
        }),
})
    .unknown(false)
    .messages({
        'object.unknown': 'No se permiten propiedades adicionales en la consulta',
        'object.missing': 'Debe proporcionar al menos uno de los campos: rutUser',
    });

export const perfilUserBodyValidation = joi.object({
    rutUser: joi.string()
        .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
        .messages({
            "string.empty": "El rut del usuario no puede estar vacío.",
            "string.base": "El rut del usuario debe ser de tipo string.",
            "string.min": "El rut del usuario debe tener como mínimo 9 caracteres.",
            "string.max": "El rut del usuario debe tener como máximo 12 caracteres.",
            "string.pattern.base": "Formato rut del usuario inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
        }),
    proyectos: joi.array()
        .items(
            joi.string()
                .min(10)
                .max(50)
                .strict()
                .trim()
                .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\.\-\d\,]+$/)
                .messages({
                    'string.empty': 'El nombre del proyecto no puede estar vacío',
                    'string.base': 'El nombre del proyecto debe ser una cadena de texto',
                    'string.min': 'El nombre del proyecto debe tener al menos 10 caracteres',
                    'string.max': 'El nombre del proyecto no puede tener más de 50 caracteres',
                    'string.pattern.base': 'El nombre del proyecto solo puede contener letras, números, puntos, guiones, comas y espacios',
                }),
        )
        .min(0)
        .max(55)
        .messages({
            'array.base': 'Los proyectos deben ser un arreglo',
            'array.min': 'Debe haber al menos un proyecto',
            'array.max': 'No puede haber más de 55 proyectos',
        }),
    actividades: joi.array()
        .items(
            joi.string()
                .min(10)
                .max(50)
                .strict()
                .trim()
                .pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\.\-\d\,]+$/)
                .messages({
                    'string.empty': 'El nombre de la actividad no puede estar vacío',
                    'string.base': 'El nombre de la actividad debe ser una cadena de texto',
                    'string.min': 'El nombre de la actividad debe tener al menos 10 caracteres',
                    'string.max': 'El nombre de la actividad no puede tener más de 50 caracteres',
                    'string.pattern.base': 'El nombre de la actividad solo puede contener letras, números, puntos, guiones, comas y espacios',
                }),
        )
        .min(0)
        .max(55)
        .messages({
            'array.base': 'Las actividades deben ser un arreglo',
            'array.min': 'Debe haber al menos una actividad',
            'array.max': 'No puede haber más de 55 actividades',
        }),
})  
    .or("rutUser", "proyectos", "actividades")
    .unknown(false)
    .messages({
        'object.unknown': 'No se permiten propiedades adicionales en el cuerpo',
        'object.missing': 'Debe proporcionar al menos uno de los campos: rutUser, proyectos o actividades',
    });
