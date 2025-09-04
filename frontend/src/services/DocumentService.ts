import apiClient from "../apiClient";

export interface Document {
    id: number;
    title: string;
    file: string;
    upload_date: string;
    uploaded_by_username: string;
}

export const DocumentService = {
    async getDocuments(search?: string): Promise<Document[]> {
        const response = await apiClient.get("/documents/", {params: { search }});
        return response.data;
    }
}