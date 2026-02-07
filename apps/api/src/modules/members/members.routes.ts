import { Router } from 'express';
import * as controller from './members.controller';

export const membersRouter: Router = Router();

membersRouter.post('/', controller.createMember);
membersRouter.get('/', controller.listMembers)
membersRouter.get('/:id', controller.getMember);
membersRouter.get('/:id/summary', controller.getMemberSummary);