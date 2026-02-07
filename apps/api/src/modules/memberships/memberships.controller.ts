import { Request, Response } from 'express';
import * as service from './memberships.service';

export async function assignMembership(req: Request, res: Response) {

    const { memberId, planId, startDate } = req.body;

    if (!memberId || !planId || !startDate) {
        return res.status(400).json({ error: 'memberId, planId and startDate are required' });
    }
    const membership = await service.assignMembership(+(memberId), +(planId), new Date(startDate as string));
    res.status(201).json(membership);
}

export async function cancelMembership(req: Request, res: Response) {
    const { memberId, endDate } = req.query;

    if (!memberId || !endDate) {
        return res.status(400).json({ error: 'memberId and endDate are required' });
    }
    const membership = await service.cancelMembership(+(memberId), new Date(endDate as string));
    res.status(204).json(membership);
}