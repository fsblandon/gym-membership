import { apiFetch } from "../../api/client";

export function createMember(data: {
    name: string;
    email: string;
}) {
    return apiFetch('/members', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function getMemberSummary(memberId: number) {
    return apiFetch(`/members/${memberId}/summary`);
}

export function listMembers(query?: string) {
    const url = query ? `/members?q=${encodeURIComponent(query)}` : '/members';
    return apiFetch(url);
}

export function getMember(memberId: number) {
    return apiFetch(`/members/${memberId}`);
}