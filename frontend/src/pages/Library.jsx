import React, { useEffect, useState } from "react";
import './Library.css';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LibraryService from "../api/library.service.jsx";
import AuthService from "../api/auth.service.jsx";

const Library = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddBookToCategoryModal, setShowAddBookToCategoryModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    const handleNewBook = (e) => {
        e.preventDefault();
        navigate('/new_book')
    }

    const handleLogout = (e) => {
        e.preventDefault();
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

        const handleSubmit = (e) => {
            e.preventDefault(); // Prevent form submission
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
                <button type="button" className="button-modal" onClick={handleSubmit}>Применить</button>
            </div>
        );
    };

    const AddBookToCategoryModal = ({ onClose, onSave }) => {
        const [selectedCategory, setSelectedCategory] = useState(null);

        const handleChange = (e) => {
            setSelectedCategory(e.target.value);
        };

        const handleSubmit = (e) => {
            e.preventDefault(); // Prevent form submission
            onSave(selectedCategory);
            onClose();
        };

        return (
            <div className="modal">
                <h3>Выберите список</h3>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index} className="modal-content-list" >
                            <input
                                type="radio"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={handleChange}
                            />
                            {category}
                        </li>
                    ))}
                </ul>
                <button type="button" className="button-modal" onClick={handleSubmit}>Сохранить</button>
            </div>
        );
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const openAddCategoryModal = (e) => {
        e.preventDefault();
        setShowAddCategoryModal(true);
    };

    const closeAddCategoryModal = () => {
        setShowAddCategoryModal(false);
    };

    const openAddBookToCategoryModal = (book) => {
        setCurrentBook(book);
        setShowAddBookToCategoryModal(true);
    };

    const closeAddBookToCategoryModal = () => {
        setShowAddBookToCategoryModal(false);
    };

    const handleApplyCategory = async (categoryName) => {
        if (!categoryName) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            const response = await LibraryService.addCategory({ name: categoryName });
            if (response) {
                setCategories(prevCategories => [...prevCategories, categoryName]);
                toast.success("Список успешно создан.");
            }
        } catch (error) {
            if (error.message === 'Такая категория уже существует.') {
                toast.error('Такая категория уже существует.');
            } else {
                toast.error('Ошибка заполнения.');
            }
        }
    };

    const handleDeleteBook = async (bookId) => {
        try {
            setBooks(books.filter(book => book.id !== bookId));
            await LibraryService.deleteBook(bookId);
            toast.success("Книга успешно удалена.");
        } catch (error) {
            setBooks([...books]);
            toast.error("Ошибка при удалении книги.");
        }
    };

    const handleSaveBookToCategory = async (categoryName) => {
        if (!currentBook || !categoryName) return;
        try {
            await LibraryService.assignBookToCategory(currentBook.id, categoryName);
            toast.success("Книга успешно добавлена в список.");
        } catch (error) {
            toast.error("Ошибка при добавлении книги в список.");
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await LibraryService.getCategories();
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Ошибка при загрузке категорий.');
            }
        };

        const fetchBooks = async () => {
            try {
                const books = await LibraryService.getBooksByUser();
                setBooks(books);
            } catch (error) {
                console.error('Error fetching books:', error);
                toast.error('Ошибка при загрузке книг.');
            }
        };

        fetchCategories();
        fetchBooks();
    }, []);

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <form className="library-container">
            {isOpen && (
                <div className="profile-menu" role="tooltip">
                    <button type="button" className="menu-button" onClick={handleProfile}>Профиль</button>
                    <button type="button" className="menu-button" onClick={handleLogout}>Выход</button>
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
                        <button type="button" className="add-category-button" onClick={openAddCategoryModal}>+ Новый список</button>
                    </div>
                    <ul className="category-list">
                        {categories.map((category, index) => (
                            <li className="category-item" key={index} onClick={() => handleCategoryClick(category)}>{category}</li>
                        ))}
                    </ul>
                    {showAddCategoryModal && (
                        <AddCategoryModal onClose={closeAddCategoryModal} onApply={handleApplyCategory} />
                    )}
                </div>

                <div className="book-library-section">
                    <div className="books-panel">
                        <h2>Мои книги</h2>
                    </div>
                    <button type="button" className="add-book-button" onClick={handleNewBook}>+ Новая книга</button>
                    <ul className="book-list">
                        {books && books.map((book) => (
                            <li key={book.id} className="book-link">
                                <Link to={`/book/${book.id}`}>
                                    <p>{book.title}</p>
                                    <p>{book.authorship}</p>
                                    <p>{book.category}</p>
                                </Link>
                                <div className="book-actions">
                                    <button type="button" className="button-del" onClick={(e) => handleDeleteBook(book.id, e)}>Удалить</button>
                                    <button type="button" className="button-add" onClick={() => openAddBookToCategoryModal(book)}>Добавить книгу в список</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {showAddBookToCategoryModal && currentBook && (
                        <AddBookToCategoryModal onClose={closeAddBookToCategoryModal} onSave={handleSaveBookToCategory} />
                    )}
                </div>
            </div>
        </form>
    );
};

export default Library;
