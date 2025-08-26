import {
    createPerfilUser,
    getPerfilUserByRut,
    updatePerfilUser,
    deleteItemsPerfilUser
} from "../controllers/perfilUser.controller.js";
import { Router } from 'express';

const router = Router();

router
    .post("/", createPerfilUser)
    .get("/detail", getPerfilUserByRut)
    .put("/detail", updatePerfilUser)
    .delete("/detail", deleteItemsPerfilUser);

export default router;