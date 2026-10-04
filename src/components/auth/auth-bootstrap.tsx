import type {ReactNode} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";
import {useRefreshQuery} from "../../redux/services/api.ts";

type Props = {
    children: ReactNode;
};
export const AuthBootstrap = ({ children } : Props) => {
    const status = useSelector(
        (state: RootState)=> state.auth.status
    )
    const { isError, isFetching, refetch } = useRefreshQuery(
        undefined,
        { skip: status !== "checking" },
    )
    if (status === "checking") {
        if (isError && !isFetching) {
            return (
                <div>
                    <p>Не удалось проверить сессию</p>
                    <button type="button" onClick={() => refetch()}>
                        Повторить
                    </button>
                </div>
            )
        }
        return  <p role="status">Проверяем сессию…</p>;
    }
    return children;
}