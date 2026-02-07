import { createBrowserRouter } from "react-router-dom";
import { CreateMemberPage } from "./pages/CreateMemberPage";
import { ActivateMembershipPage } from "./pages/ActivateMembershipPage";
import { CheckInPage } from "./pages/CheckInPage";
import { MemberSummaryPage } from "./pages/MemberSummaryPage";
import { MemberListPage } from "./pages/MemberListPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <CreateMemberPage />
    },
    {
        path: '/members/:memberId',
        element: <MemberSummaryPage />
    },
    {
        path: '/members/:memberId/membership',
        element: <ActivateMembershipPage />
    },
    {
        path: '/members',
        element: <MemberListPage />
    },
    {
        path: '/checkin',
        element: <CheckInPage />
    }
]);