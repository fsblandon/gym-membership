import { useNavigate, useSearchParams } from 'react-router-dom'
import { createCheckIn } from '../modules/checkins/checkin.api';

export function CheckInPage() {

    const navigate = useNavigate();
    const [params] = useSearchParams()
    const memberId = params.get('memberId')

    async function handleCheckIn() {
        if (!memberId) return

        await createCheckIn(Number(memberId))
        alert('Check-in successful');
        navigate(`/members/${memberId}`);
    }

    return (
        <>
        <div>
            <button onClick={() => navigate(`/members`)}>Return to list</button>
        </div>
        <div>
            <h2>Check-in</h2>
            <p>Member ID: {memberId}</p>
            <button onClick={handleCheckIn}>
                Register
            </button>
        </div>
        </>
    )
}
