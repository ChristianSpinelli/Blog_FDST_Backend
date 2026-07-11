import { Router } from "express";
import { UserController } from "../../controllers/user/userController";
import { authorizeRoles } from "../../middlewares/authMiddleware";
import { Perfil } from "../../model/utils/perfil.model";
import { authenticateMock } from "../../middlewares/authMockMiddleware";

const router = Router();
const userConttoller = new UserController();

router.post('/', authenticateMock(), authorizeRoles(Perfil.admin), userConttoller.create);
router.get('/', authenticateMock(), authorizeRoles(Perfil.admin), userConttoller.list);
router.get('/:username', authenticateMock(), authorizeRoles(Perfil.admin), userConttoller.findUserByUsername)

export default router;
