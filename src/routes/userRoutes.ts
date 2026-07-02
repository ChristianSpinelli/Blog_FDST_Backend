import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authorizeRoles } from "../middlewares/authMiddleware";
import { Perfil } from "../model/perfil.model";

const router = Router();
const userConttoller = new UserController();

router.post('/', authorizeRoles(Perfil.admin), userConttoller.create);
router.get('/', authorizeRoles(Perfil.admin), userConttoller.list);

export default router;
