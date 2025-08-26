import joi from "joi";

export const actividadCreateValidation = joi.object({
    titulo: joi.string()
        .min(15)
        .max(50)
        .trim()
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El titulo de la actividad no puede estar vacío.",
            "string.base": "El titulo de la actividad debe ser de tipo string.",
            "string.min": "El titulo de la actividad debe tener como mínimo 15 caracteres.",
            "string.max": "El titulo de la actividad debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El titulo de la actividad solo puede contener letras y espacios.",
        }),
    temaActividad: joi.string()
        .min(5)
        .max(50)
        .trim()
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El tema de la actividad no puede estar vacío.",
            "string.base": "El tema de la actividad debe ser de tipo string.",
            "string.min": "El tema de la actividad debe tener como mínimo 5 caracteres.",
            "string.max": "El tema de la actividad debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El tema de la actividad solo puede contener letras y espacios.",
        }),
})
    .or("titulo", "temaActividad")
    .unknown(false)
    .messages({
        'object.unknown': 'No se permiten propiedades adicionales en el cuerpo',
        'object.missing': 'Debe proporcionar al menos uno de los campos: titulo o temaActividad',
    });

export const actividadBodyValidation = joi.object({
    titulo: joi.string()
        .min(15)
        .max(50)
        .trim()
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El titulo de la actividad no puede estar vacío.",
            "string.base": "El titulo de la actividad debe ser de tipo string.",
            "string.min": "El titulo de la actividad debe tener como mínimo 15 caracteres.",
            "string.max": "El titulo de la actividad debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El titulo de la actividad solo puede contener letras y espacios.",
        }),
    temaActividad: joi.string()
        .min(5)
        .max(50)
        .trim()
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El tema de la actividad no puede estar vacío.",
            "string.base": "El tema de la actividad debe ser de tipo string.",
            "string.min": "El tema de la actividad debe tener como mínimo 5 caracteres.",
            "string.max": "El tema de la actividad debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El tema de la actividad solo puede contener letras y espacios.",
        }),
    duracion: joi.number()
        .min(1)
        .messages({
            "number.base": "La duración de la actividad debe ser un número.",
            "number.min": "La duración de la actividad debe ser al menos 1 minuto.",
        }),
    descripcion: joi.string()
        .min(10)
        .max(500)
        .trim()
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,]+$/)
        .messages({
            "string.empty": "La descripción de la actividad no puede estar vacía.",
            "string.base": "La descripción de la actividad debe ser de tipo string.",
            "string.min": "La descripción de la actividad debe tener como mínimo 10 caracteres.",
            "string.max": "La descripción de la actividad debe tener como máximo 500 caracteres.",
            "string.pattern.base": "La descripción de la actividad solo puede contener letras, espacios y algunos caracteres especiales.",
        })
})
    .or("titulo", "temaActividad", "duracion", "descripcion")
    .unknown(false)
    .messages({
        'object.unknown': 'No se permiten propiedades adicionales en el cuerpo',
        'object.missing': 'Debe proporcionar al menos uno de los campos: titulo, temaActividad, duracion o descripcion',
    });
