import { Router } from "express";
import { membersRouter } from "./modules/members/members.routes";
import { checkinsRouter } from "./modules/checkins/checkins.routes";
import { membershipsRouter } from "./modules/memberships/memberships.routes";
import { plansRouter } from "./modules/plans/plans.routes";

export const router: Router = Router();

router.use('/members', membersRouter);
router.use('/memberships', membershipsRouter);
router.use('/checkins', checkinsRouter);
router.use('/plans', plansRouter);