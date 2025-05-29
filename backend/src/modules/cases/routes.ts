import { Router } from 'express';

import { CaseController } from './controllers/case.controller';
import { asyncHandler } from '../../shared/middlewares';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';

const caseRouter = Router();
const caseController = new CaseController();

caseRouter.get(
  '/',
  authMiddleware,
  asyncHandler((req, res) => caseController.findAllCases(req, res)),
);

caseRouter.post(
  '/',
  authMiddleware,
  asyncHandler((req, res) => caseController.createCase(req, res)),
);

caseRouter.put(
  '/:id',
  authMiddleware,
  asyncHandler((req, res) => caseController.updateCase(req, res)),
);

caseRouter.delete(
  '/:id',
  authMiddleware,
  asyncHandler((req, res) => caseController.deleteCase(req, res)),
);

export default caseRouter;
