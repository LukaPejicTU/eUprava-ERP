import axios from "axios";
import { AuthService } from "./services/AuthService";

const apiClient = axios.create({
    baseURL: '/api' 
  });
  
  apiClient.interceptors.request.use(
    (config) => {
      const token = AuthService.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default apiClient;