import { Request, Response } from 'express';
import * as service from './members.service';

export async function createMember(req: Request, res: Response) {
    const member = await service.createMember(req.body);
    res.status(201).json(member);
}


export async function listMembers(req: Request, res: Response) {
    try {
        const q = req.query.q as string | undefined;
        const members = await service.listMembers(q);
        res.json(members);
    } catch (error) {
        next(error);
    }
}


export async function getMember(req: Request, res: Response) {
    const member = await service.getMember(+req.params.id);
    res.json(member);
}

export async function getMemberSummary(req: Request, res: Response) {
    const summary = await service.getMemberSummary(+req.params.id);
    res.json(summary);
}

function next(error: unknown) {
    throw new Error('Function not implemented.');
}
