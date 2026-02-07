import { useNavigate, useParams } from 'react-router-dom'
import { createMembership } from '../modules/memberships/memberships.api';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPlans } from '../modules/plans/plans.api';

type Plan = {
    id: number;
    name: string;
}

export function ActivateMembershipPage() {
    const navigate = useNavigate();
    const { memberId } = useParams<{ memberId: string }>();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

    useEffect(() => {
        getPlans().then((data) => setPlans(data as Plan[])).catch(() => alert('Failed to load plans'));
    }, [])

    async function handleActivate() {
        if (!selectedPlan) {
            return;
        }
        if (!memberId) {
            alert('Member ID is missing');
            return;
        }
        try {
            await createMembership({
                memberId: Number(memberId),
                planId: selectedPlan,
                startDate: new Date()
            });

            alert('Membership activated successfully');
            navigate(`/checkin?memberId=${memberId}`);
        } catch (error) {
            console.error();
            alert('Failed to activate membership');
        }
        
    }

  return (
    <>
        <h2>Activate membership</h2>

        <ul>
            {plans.map(plan => (
                <li key={plan.id}>
                    <label>
                        <input
                            type="radio"
                            value={plan.id}
                            name="plan"
                            onChange={() => setSelectedPlan(plan.id)}
                        />
                        {plan.name}
                    </label>
                    
                </li>
            ))}
        </ul>
        <button onClick={handleActivate} disabled={!selectedPlan}>
            Activate Membership
        </button>
    </>
  )
}
