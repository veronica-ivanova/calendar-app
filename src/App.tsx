import { Calendar } from "./components/calendar/calendar";
import {Layout} from "./components/layout/layout.tsx";
import {ThemeContextProvider} from "./components/theme-context/theme-context-provider.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

const App = () => {
    return (
        <Provider store={store}>
            <ThemeContextProvider>
                    <Layout>
                        <Calendar/>
                    </Layout>
            </ThemeContextProvider>
        </Provider>
    )
}

export default App;

