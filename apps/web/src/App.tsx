// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { useState } from "react";
import { CheckInForm } from "./modules/checkins/CheckInForm";
import { CreateMemberForm } from "./modules/members/CreateMemberForm";
import { CreateMembershipForm } from "./modules/memberships/CreateMembershipForm";


export default function App() {
  const [memberId, setMemberId] = useState<number | null>(null);

  return (
    <main>
      <h1>Gym Membership App</h1>
      <CreateMemberForm onCreated={setMemberId}/>
      {memberId && (
        <>
          <CreateMembershipForm memberId={memberId}/>
          <CheckInForm />
        </>
      )}
    </main>
  );
}