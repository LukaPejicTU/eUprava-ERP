import apiClient from "../apiClient";

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'manager' | 'worker';
    has_subordinates: boolean;
  }

export const UserService = {
    async getAllUsers(): Promise<User[]> {
        const response = await apiClient.get("/users/");
        return response.data;
    },

    async deleteUser(id: number): Promise<void> {
        const response = await apiClient.delete(`/users/${id}/`);
    } 
}