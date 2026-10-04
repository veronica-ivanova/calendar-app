import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../../redux/store";

export const RequireAuth = () => {
    const status = useSelector(
        (state: RootState) => state.auth.status,
    );

    if (status === "checking") {
        return <p role="status">Проверяем сессию…</p>;
    }

    if (status !== "authenticated") {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};