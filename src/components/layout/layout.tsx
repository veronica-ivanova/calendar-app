import styles from "./layout.module.css";
import {Header} from "../header/header.tsx";
import {Outlet} from "react-router";

export const Layout = () => {
    return (
        <div className={styles.root}>
            <div className="container">
                <Header />
                    <main>
                        <Outlet/>
                    </main>
            </div>
        </div>
    )
}