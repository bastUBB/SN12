import mongoose from "mongoose";

const perfilUserSchema = mongoose.Schema({
    rutUser: {
        type: String,
        required: true,
        unique: true,
        cast: false
    },
    proyectos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proyecto',
        cast: false
    }],
    actividades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actividad',
        cast: false
    }],
    planificaciones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'planificacion',
        cast: false
    }],
    logros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'logro',
        cast: false
    }]
}, {
    timestamps: true,
    versionKey: false,
    strict: true
});

const perfilUser = mongoose.model('perfilUser', perfilUserSchema);
export default perfilUser;