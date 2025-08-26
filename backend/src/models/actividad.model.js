import mongoose from "mongoose";

const actividadSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        cast: false
    },
    temaActividad: {
        type: String,
        required: true,
        cast: false
    },
    duracion: {
        type: Number,
        required: true,
        cast: false
    },
    descripcion: {
        type: String,
        required: true,
        cast: false
    }
}, {
    timestamps: true,
    versionKey: false,
    strict: true
});

const actividad = mongoose.model('actividad', actividadSchema);
export default actividad;