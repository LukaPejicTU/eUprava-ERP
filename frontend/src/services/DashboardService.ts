import apiClient from "../apiClient";

export interface DashboardTask {
    id: number;
    title: string;
    status: string;
}

export interface DashboardData {
    my_open_tasks_count: number;
    recent_tasks: DashboardTask[];
}


export const DashboardService = {
    async getDashboardData(): Promise<DashboardData> {
        const response = await apiClient.get("/dashboard/");
        return response.data;
    }
}