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
    },
    async getCategories() {
        try {
            const response = await instance.get("http://localhost:8080/api/gtr/library");
            const categories = response.data.map(category => category.name);
            return categories;
        } catch (error) {
            throw new Error('Ошибка при загрузке категорий.');
        }
    },
    async createBook(userData) {
        try {
            const response = await instance.post("http://localhost:8080/api/gtr/book", userData);
            console.log(userData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error('Ошибка заполнения данных.');
            }
        }
    },
    async getBooksByUser() {
        try {
            const response = await instance.get("http://localhost:8080/api/gtr/books");
            return response.data;
        } catch (error) {
            throw new Error('Ошибка при загрузке книг пользователя.');
        }
    },
    async getBookById(bookId) {
        try {
            const response = await instance.get(`http://localhost:8080/api/gtr/book/${bookId}`);
            console.log('getBookById response:', response.data); // Добавьте отладочную информацию
            return response.data;
        } catch (error) {
            console.error('Error in getBookById:', error); // Добавьте отладочную информацию
            throw new Error('Ошибка при загрузке книг пользователя.');
        }
    },
    async deleteBook(bookId) {
        try {
            await instance.delete(`http://localhost:8080/api/gtr/book/${bookId}`);
        } catch (error) {
            throw new Error('Ошибка при удалении книги.');
        }
    },
    async assignBookToCategory(bookId, categoryName) {
        try {
            // Выводим имя категории в консоль для отладки
            console.log(`Assigning category "${categoryName}" to book with ID: ${bookId}`);

            const response = await instance.post(`http://localhost:8080/api/gtr/${bookId}/assignCategory`, {categoryName});
            return response.data;

        } catch (error) {
            console.error('Error assigning category to book:', error.response ? error.response.data : error.message);
            throw new Error('Ошибка при добавлении книги в категорию.');
        }
    },
    async getBooksByCategory(categoryName) {
        try {
            const response = await instance.get(`http://localhost:8080/api/gtr/library/${categoryName}/books`);
            return response.data;
        } catch (error) {
            throw new Error('Ошибка при загрузке книг по категории.');
        }
    },

};
export default LibraryService;