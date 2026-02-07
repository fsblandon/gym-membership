
import { Request, Response } from 'express';
import * as service from './checkins.service';

export async function createCheckIn(req: Request, res: Response) {
    const { memberId } = req.body;
    if (!memberId) {
        return res.status(400).json({ error: 'Member ID is required' });
    }
    const checkin = await service.createCheckIn(memberId);
    return res.status(201).json(checkin);
}