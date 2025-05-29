import { Router } from 'express';

import { UserController } from './controllers/user.controller';
import { asyncHandler } from '../../shared/middlewares';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  asyncHandler((req, res) => userController.createUser(req, res)),
);
userRouter.delete(
  '/:id',
  authMiddleware,
  asyncHandler((req, res) => userController.deleteUser(req, res)),
);

export default userRouter;
