import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMember } from '../modules/members/members.api'

export function CreateMemberPage() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const member = await createMember({ name, email }) as { id: string }
        navigate(`/members/${member.id}/membership`);
    }
    return (
        <>
            <div>
                <h1>Create Member</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Create Member</button>
                </form>
            </div>
            <div>
                <h2>View List Members</h2>
                <button onClick={() => navigate('/members')}>View Members</button>
            </div>
        </>
    )

}




