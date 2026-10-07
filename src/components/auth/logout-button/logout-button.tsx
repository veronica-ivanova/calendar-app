import type {AppDispatch} from "../../../redux/store.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {useLogoutMutation} from "../../../redux/services/api.ts";
import {clearSession} from "../../../redux/features/auth/authSlice.ts";

export const LogoutButton = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [logout, { isLoading, isError}] = useLogoutMutation();

    const handleLogout = async() => {
        try {
            await logout().unwrap();
        } catch {
            return;
        }

        dispatch(clearSession());
        navigate("/auth", {replace: true});
    }

    return (
        <div>
            <button
                type="button"
                disabled={isLoading}
                onClick={handleLogout}
            >
                Выйти
            </button>

            {isError && (
                <p>
                    Не удалось завершить сессию. Попробуйте ещё раз.
                </p>
            )}
        </div>
    )

}