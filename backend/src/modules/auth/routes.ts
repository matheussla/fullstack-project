import { Router } from 'express';

import { AuthController } from './controllers/auth.controller';
import { asyncHandler } from '../../shared/middlewares';

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  '/login',
  asyncHandler((req, res) => authController.login(req, res)),
);

export default authRouter;
