import apiClient from "../apiClient"
import { FormValues } from "../components/TaskForm"

export const TaskService = {

    async createTask(task: FormValues): Promise<void> {
        await apiClient.post("/tasks/", task);

    }
}
        