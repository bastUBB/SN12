import { Router } from 'express';
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js"
import perfilUser from "./perfilUser.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/perfilUser", perfilUser)
    .use("/users", userRoutes);

export default router;