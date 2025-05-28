import { Router } from 'express';
import authRouter from 'src/modules/auth/routes';
import userRouter from 'src/modules/users/routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
