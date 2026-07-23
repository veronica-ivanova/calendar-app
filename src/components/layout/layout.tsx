import styles from "./layout.module.css";
import {Header} from "../header/header.tsx";

type Props = {
    children: React.ReactNode;
}

export const Layout = ({ children } : Props) => {
    return (
        <div className={styles.root}>
            <div className="container">
                <Header />
                    <main>
                        {children}
                    </main>
            </div>
        </div>
    )
}