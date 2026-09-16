import { Calendar } from "./components/calendar/calendar";
import {Layout} from "./components/layout/layout.tsx";
import {ThemeContextProvider} from "./components/theme-context/theme-context-provider.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {Routes, Route, BrowserRouter} from "react-router";
import {Auth} from "./pages/auth/auth.tsx";

const App = () => {
    return (
        <Provider store={store}>
            <ThemeContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<Auth/>}/>

                        <Route element={<Layout/>}>
                            <Route path="/" element={<Calendar/>}/>
                        </Route>

                        <Route
                            path="*"
                            element={<h1>Страница не найдена</h1>}
                        />

                    </Routes>
                </BrowserRouter>
            </ThemeContextProvider>
        </Provider>
    )
}

export default App;

