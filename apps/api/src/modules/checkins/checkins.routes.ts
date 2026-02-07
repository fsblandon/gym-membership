import { Router } from "express";
import * as controller from './checkins.controller';

export const checkinsRouter: Router = Router();

checkinsRouter.post('/', controller.createCheckIn);