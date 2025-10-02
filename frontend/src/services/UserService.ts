import apiClient from "../apiClient";

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'manager' | 'worker';
    has_subordinates: boolean;
  }

  export type UserData = Partial<Omit<User, 'id'>>;

export const UserService = {
    async getAllUsers(): Promise<User[]> {
        const response = await apiClient.get("/users/");
        return response.data;
    },

    async deleteUser(id: number): Promise<void> {
        const response = await apiClient.delete(`/users/${id}/`);
    },

    async createUser(data: UserData): Promise<User> {
        const response = await apiClient.post("/users/", data);
        return response.data;
    },

    async updateUser(id: number, data: UserData): Promise<User> {
        const response = await apiClient.patch(`/users/${id}/`,data);
        return response.data;
    }
}