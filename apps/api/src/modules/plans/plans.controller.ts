import { Request, Response } from 'express';
import * as service from './plans.service';

export async function listPlans(req: Request, res: Response) {
    const plans = await service.listPlans();
    res.json(plans);
}
