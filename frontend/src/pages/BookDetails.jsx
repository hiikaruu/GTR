import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import {useNavigate, useParams} from "react-router-dom";
import LibraryService from '../api/library.service.jsx';
import './BookDetails.css';
import AuthService from "../api/auth.service.jsx";
import {toast} from "react-toastify";

const getFileUrl = (publicId) => {
    return `https://res.cloudinary.com/dg0ibsz9h/raw/upload/v1/gtr/${publicId}.docx`;
};

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fileUrl, setFileUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const handleSaveCategory = () => {
        // Implement the save category logic
        setShowModal(false);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        AuthService.logout();
        navigate('/login');
    }
    const handleProfile = (e) => {
        e.preventDefault();
        navigate('/profile');
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const fetchCategories = async () => {
        try {
            const categories = await LibraryService.getCategories();
            setCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Ошибка при загрузке категорий.');
        }
    };
    useEffect(() => {
        if (showModal) {
            fetchCategories();
        }
    }, [showModal]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await LibraryService.getBookById(parseInt(bookId));
                console.log('fetchBookDetails response:', response);
                setBook(response);
                const url = getFileUrl(response.file_url);
                setFileUrl(url);
                console.log('File URL:', url);
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    useEffect(() => {
        const checkFileAvailability = async () => {
            if (fileUrl) {
                try {
                    const response = await fetch(fileUrl, { method: 'HEAD' });
                    if (!response.ok) {
                        throw new Error('File not found');
                    }
                    console.log('File is available');
                } catch (error) {
                    console.error('Error checking file availability:', error);
                    setFileUrl('');
                }
            }
        };

        checkFileAvailability();
    }, [fileUrl]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Error loading book details</div>;
    }

    return (

        <form className="book-details-container">
            {isOpen && (
                <div className="profile-menu" role="tooltip">
                    <button className="menu-button" onClick={handleProfile}>Профиль</button>
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
            <div className="book">
                <div className="main-container">
                    <h2>Книга:</h2>
                    <div className="book-info">
                        <p>Название: {book.title}</p>
                        <p>Автор: {book.authorship}</p>
                        <p>Дата публикации: {book.dop}</p>
                    </div>
                    <div className="cat-container">
                        <button
                            type="button"
                            className="add-to-list-button"
                            onClick={() => setShowModal(true)}
                        >
                            Добавить в список
                        </button>
                        {showModal && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h3>Выберите список для добавления</h3>
                                    <ul className="category-list">
                                        {categories.map((category) => (
                                            <li key={category.id}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        value={category.id}
                                                        checked={selectedCategory === category.id}
                                                        onChange={() => handleCategoryChange(category.id)}
                                                    />
                                                    {category.name}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={handleSaveCategory}>Сохранить</button>
                                    <button onClick={() => setShowModal(false)}>Закрыть</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="doc-viewer">
                    {fileUrl ? (
                        <>
                        <DocViewer
                            documents={[{ uri: fileUrl, fileType: 'docx' }]}
                            pluginRenderers={DocViewerRenderers}
                            config={{
                                header: {
                                    disableHeader: true,
                                },
                            }}
                        />
                        <a href={fileUrl} download className="download-button"> Скачать</a>
                        </>

                    ) : (
                        <div>File not available</div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default BookDetails;
