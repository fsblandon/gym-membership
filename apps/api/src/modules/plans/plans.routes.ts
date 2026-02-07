import { Router } from 'express'
import * as controller from './plans.controller'

export const plansRouter: ReturnType<typeof Router> = Router();

plansRouter.get('/', controller.listPlans);
