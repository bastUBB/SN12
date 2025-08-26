import {
    createUser,
    getUserByRut,
    getAllUsers,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';
import { Router } from 'express';

const router = Router();

router
    .post("/", createUser)
    .get("/detail", getUserByRut)
    .get("/", getAllUsers)
    .patch("/detail", updateUser)
    .delete("/detail", deleteUser);

export default router;
