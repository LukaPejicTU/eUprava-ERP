import apiClient from "../apiClient";

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'manager' | 'worker';
  }

export const UserService = {
    async getAllUsers(): Promise<User[]> {
        const response = await apiClient.get("/users/");
        return response.data;
    }
}