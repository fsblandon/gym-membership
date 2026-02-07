import { apiFetch } from "../../api/client";

type ActivateMembershipInput = {
    memberId: number;
    planId: number;
    startDate: Date;
};

export function createMembership(input: ActivateMembershipInput) {
    return apiFetch('/memberships', {
        method: 'POST',
        body: JSON.stringify(input)
    });
}