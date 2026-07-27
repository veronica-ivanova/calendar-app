import { Calendar } from "./components/calendar/calendar";
import {Layout} from "./components/layout/layout.tsx";
import {ThemeContextProvider} from "./components/theme-context/theme-context-provider.tsx";

const App = () => {
    return (
        <ThemeContextProvider>
                <Layout>
                    <Calendar/>
                </Layout>
        </ThemeContextProvider>
    )
}

export default App;

