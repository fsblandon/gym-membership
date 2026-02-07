import { apiFetch } from '../../api/client'

export function getPlans() {
    return apiFetch('/plans');
}
