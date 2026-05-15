import styles from "./layout.module.css";
import {Header} from "../header/header.tsx";
import {Footer} from "../footer/footer.tsx";

type Props = {
    children: React.ReactNode;
}

export const Layout = ({ children } : Props) => {
    return (
        <div className={styles.root}>
            <Header />
                <main>
                    {children}
                </main>
            <Footer />
        </div>
    )
}