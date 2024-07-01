import React, { useState } from "react";
import { Navigate, Route, useLocation } from 'react-router-dom';
import AuthService from "../api/auth.service.jsx";
import { useNavigate } from 'react-router-dom';
import { PiBookBookmarkLight } from "react-icons/pi";
import {toast} from "react-toastify";
import './Gtr.css';
import tg from '../components/assets/tg.png'

const Gtr = ({ onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(AuthService.isLoggedIn());

    const handleLogout = (e) => {
        e.preventDefault();
        AuthService.logout();
        setLoggedIn(false);
        navigate('/login');
        toast.success("Logout is successful");

    }
    const switchToLibraryForm = (e) => {
        e.preventDefault();
        navigate('/library');
    }
    const handleProfile = (e) => {
        e.preventDefault();
        navigate('/profile');
    }
    const handleNewBook = (e) =>{
        e.preventDefault();
        navigate('/new_book')
    }
    return (
        <form className="gtr">
            <div className="left-panel">
                <h2>
                    GO TO READ </h2>
                <div className="scrollable-content">

                    <p> Наше приложение - это ваш удобный проводник в мире чтения. С его помощью вы легко можете добавлять книги в различных форматах. Организуйте вашу библиотеку, категоризируя книги. Наше приложение также предлагает регистрацию и авторизацию для удобства пользователей, а также интеграцию с облачным хранилищем для безопасного хранения ваших данных. Кроме того, вы можете использовать наш Telegram бот для управления вашей библиотекой прямо из мессенджера. Добро пожаловать в мир чтения с нашим приложением!</p>
                </div>
            </div>
            <div className="right-panel">
                <div className="right-panel-button">
                    <button type="button" className="button" >• TG bot</button>
                    <button type="button" className="button" onClick={handleNewBook} >+ Добавить книгу</button>
                    <button type="button" className="button" onClick={switchToLibraryForm}>• Моя библиотека</button>
                    <button type="button" className="button" onClick={handleProfile}>• Профиль пользователя</button>
                    <button className="button" type="submit" onClick={handleLogout}>• Выход</button>
                </div>



            </div>

        </form>
    );
};

export default Gtr;