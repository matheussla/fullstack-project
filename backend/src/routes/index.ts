import { Router } from 'express';

import authRouter from '../modules/auth/routes';
import caseRouter from '../modules/cases/routes';
import userRouter from '../modules/users/routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/cases', caseRouter);

export default router;
