import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true,
        cast: false
    },
    rut: {
        type: String,
        required: true,
        unique: true,
        cast: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        cast: false
    },
    password: {
        type: String,
        required: true,
        cast: false
    },
    role: {
        type: String,
        required: true,
        cast: false
    }
}, {
    timestamps: true,
    versionKey: false,
    strict: true
});

const User = mongoose.model('User', userSchema);
export default User;