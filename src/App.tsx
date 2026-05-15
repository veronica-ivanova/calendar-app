import { Calendar } from "./components/calendar/calendar";
import {Layout} from "./components/layout/layout.tsx";

const App = () => {
  return (
    <div>
        <Layout>
            <Calendar/>
        </Layout>
    </div>
  )
}

export default App;

