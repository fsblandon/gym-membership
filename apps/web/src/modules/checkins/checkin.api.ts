import { apiFetch } from "../../api/client";

export function createCheckIn(memberId: number) {
    return apiFetch('/checkins', {
        method: 'POST',
        body: JSON.stringify({ memberId }),
    });
}