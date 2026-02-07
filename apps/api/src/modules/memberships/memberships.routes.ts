import { Router } from 'express';
import * as controller from './memberships.controller';

export const membershipsRouter: Router = Router();

membershipsRouter.post('/', controller.assignMembership);
membershipsRouter.patch('/:id/cancel', controller.cancelMembership);