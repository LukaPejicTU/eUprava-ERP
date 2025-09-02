import apiClient from "../apiClient";

export interface Document {
    id: string;
    title: string;
    file: string;
    upload_date: string;
    uploaded_by: number;
}

export const DocumentService = {
    async getDocuments(): Promise<Document[]> {
        const response = await apiClient.get("/documents/");
        return response.data;
    }
}