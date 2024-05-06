import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5173/',

    headers: {
        'Content-Type': 'application/json',
    }
});

const AuthService = {
     isLoggedIn() {
        const token = this.getToken();
        return token !== null;
    },
    async register(userData) {
        try {

            const response = await instance.post("http://localhost:8080/api/auth/register", userData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 409) {
                throw new Error('This email is already registered.');
            } else {
                console.error('Registration error:', error);
                throw new Error('An error occurred during registration.');
            }
        }
    },

    async login(userData) {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login',  userData );
            const { token } = response.data;
            localStorage.setItem('token', token); // Сохранение токена в локальном хранилище
            return token;
        } catch (error) {
            throw new Error('Authentication failed');
        }
    },

    // Метод для выхода пользователя
    logout() {
        localStorage.removeItem('token'); // Удаление токена из локального хранилища
    },

    // Метод для получения токена из локального хранилища
    getToken() {
        return localStorage.getItem('token');
    }
};

export default AuthService;