import { useState } from "react";
import { listMembers } from "../modules/members/members.api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function MemberListPage() {
    const [query, setQuery] = useState('');
    const [members, setMembers] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        listMembers(query).then(setMembers);
    }, [query])

    return (
        <>
            <div>
                <h2>Member List</h2>
                <input
                    type="text"
                    placeholder="Search member by email or name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <ul>
                    {members.map((m) => (
                        <li key={m.id}>
                            <button
                                onClick={() => navigate(`/members/${m.id}`)}>
                                {m.name} - ({m.email})
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={() => navigate(`/`)}>Add New Member</button>
            </div>
        </>
    )
}