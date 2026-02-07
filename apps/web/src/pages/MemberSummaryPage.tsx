import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberSummary } from "../modules/members/members.api";

export function MemberSummaryPage() {
    const { memberId } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!memberId) return;

        getMemberSummary(Number(memberId))
            .then(setData)
            .catch(() => setError('Failed to load member summary'))
            .finally(() => setLoading(false))
    }, [memberId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <div>
            <button onClick={() => navigate(`/members`)}>Return to list</button>
        </div>
        <div>
            <button 
                onClick={() => navigate(`/checkin?memberId=${memberId}`)}
                disabled={data.membership.active === false}>
                Make Check In
            </button>
        </div>
        <div>
            <h2>Member Summary</h2>
                <p>
                    <strong>Name:</strong> {data.name}<br />
                    <strong>Email:</strong> {data.email}<br />
                </p>

                <hr />
                
                <h3>Memberships</h3>
                {data.membership.active ? (
                    <p>Active membership (Plan: {data.membership.plan})</p>
                ) : (
                    
                    <div>
                        <p>No active membership</p>
                        <button onClick={() => navigate(`/members/${memberId}/membership`)}>Activate Membership</button>
                    </div>
                )}

                <hr />
                
                <h3>Check-ins</h3>
                <p>
                    <strong>Last Check-in:</strong> {data.lastCheckIn ? new Date(data.lastCheckIn).toLocaleString() : 'No check-ins yet'}<br />
                    <strong>Check-ins in last 30 days:</strong> {data.checkInsLast30Days}
                </p>
            </div>
        </>
    )
};