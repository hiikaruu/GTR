import React, { useState } from "react";
import './Library.css';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import LibraryService from "../api/library.service.jsx";
import AuthService from "../api/auth.service.jsx";


const Library = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    }
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const AddCategoryModal = ({ onClose, onApply }) => {
        const [categoryName, setCategoryName] = useState("");

        const handleChange = (e) => {
            setCategoryName(e.target.value);
        };

        const handleSubmit = () => {

            onApply(categoryName);
            onClose();
        };

        return (
            <div className="modal">
                <input
                    className="text-modal"
                    type="text"
                    value={categoryName}
                    onChange={handleChange}
                    placeholder="Введите название"
                />
                <button className="button-modal" onClick={handleSubmit}>Применить</button>
            </div>
        );
    };
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState(["Читаю", "Прочитано", "В планах"]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const openModal = (e) => {
        e.preventDefault(); // Предотвращаем стандартное действие кнопки
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleApplyCategory =  async (categoryName) => {
        if (!categoryName) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            const response = await LibraryService.addCategory({ categoryName });
            if (response) {
                setCategories([...categories, categoryName]);
                toast.success("Список успешно создан.");
            }
        } catch (error) {
            if (error.message === 'This email is already registered.') {
                toast.error('This email is already registered.');
            } else {
                toast.error('Ошибка заполнения.');
            }
        }
    };


    return (
        <form className="library-container" >
            {isOpen && (
                <div className="profile-menu" role="tooltip">
                    <button className="menu-button">Профиль</button>
                    <button className="menu-button">Настройки</button>
                    <button className="menu-button" onClick={handleLogout}>Выход</button>
                </div>
            )}
            <div className="library-header">
                <h1>GTR | Library</h1>
                <input type="text" className="search-bar" placeholder="Search..." />
                <div className="user-profile" onClick={toggleMenu}>
                    User Profile
                </div>
            </div>

            <div className="library-container-main">
                <div className="categories-library-section">
                    <div className="categories-panel">
                        <h2>Списки</h2>
                    </div>
                    <div>
                        <button className="add-category-button" onClick={openModal}>+ Новый список</button>
                    </div>
                    <ul className="category-list">
                        {categories.map((category, index) => (
                            <li className="category-item" key={index} onClick={() => handleCategoryClick(category)}>{category}</li>
                        ))}
                    </ul>
                    {showModal && (
                        <AddCategoryModal onClose={closeModal} onApply={handleApplyCategory} />
                    )}
                </div>

                <div className="book-library-section">
                    <div className="books-panel">
                        <h2>Мои книги</h2>
                    </div >
                    <button className="add-book-button">+ Новая книга</button>
                    <ul className="book-list">

                    </ul>
                </div>
            </div>
        </form>
    );
};

export default Library;