import { Router } from 'express';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { asyncHandler } from 'src/shared/middlewares';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/login',
  asyncHandler((req, res) => authController.login(req, res)),
);

export default authRouter;
