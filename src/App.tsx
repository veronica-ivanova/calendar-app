import { Calendar } from "./components/calendar/calendar";
import {Layout} from "./components/layout/layout.tsx";
import type {Task} from "./types/types.ts";
import {tasks as mockTasks} from "./mock.ts";
import {useState} from "react";

const App = () => {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    return (
        <div>
            <Layout>
                <Calendar tasks={tasks} setTasks={setTasks} />
            </Layout>
        </div>
    )
}

export default App;

