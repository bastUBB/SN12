import mongoose from "mongoose";

const planificacionSchema = mongoose.Schema({
    listaActividades: [{
        type: String,
        cast: false
    }],
    duracionEstimada: {
        type: Number,
        required: true,
        cast: false
    },
    progreso: {
        type: Number,
        required: true,
        cast: false
    },
    temaPlanificacion: {
        type: String,
        required: true,
        cast: false
    }
}, {
    timestamps: true,
    versionKey: false,
    strict: true
});

const planificacion = mongoose.model('planificacion', planificacionSchema);
export default planificacion;