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
    },

    async uploadDocument(title: string, file: File): Promise<Document> {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);
    
        const response = await apiClient.post("/documents/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      }
}