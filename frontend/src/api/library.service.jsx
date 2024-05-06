import axios from 'axios';
import AuthService from "./auth.service.jsx";

const token = AuthService.getToken()

const instance = axios.create({
    baseURL: 'http://localhost:5173/',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
});

const LibraryService = {
    async addCategory(userData) {
        try {
            const response = await instance.post("http://localhost:8080/api/gtr/library", userData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 409) {
                throw new Error('Такая категоря уже существует.');
            }
        }
    }
};
export default LibraryService;