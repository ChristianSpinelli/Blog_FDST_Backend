import { Router } from "express";
import { LoginController } from "../../controllers/login/loginController";
import { authenticateMock } from "../../middlewares/authMockMiddleware";
import { authorizeRoles } from "../../middlewares/authMiddleware";
import { Perfil } from "../../model/utils/perfil.model";

const router = Router();
const loginController = new LoginController();

router.post('/', authenticateMock(), authorizeRoles(Perfil.professor, Perfil.admin, Perfil.aluno), loginController.login);

export default router;