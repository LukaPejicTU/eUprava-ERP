import axios from "axios"
import { FormValues } from "../components/TaskForm"

export const TaskService = {

    async createTask(task: FormValues): Promise<void> {
        await axios.post("/api/tasks", task);

    }
}
        