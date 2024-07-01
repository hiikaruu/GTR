import React, { useState } from "react";
import { toast } from "react-toastify";
import LibraryService from "../api/library.service.jsx";
import './Book.css';
import { Cloudinary } from '@cloudinary/url-gen';
import {useNavigate} from "react-router-dom";
import AuthService from "../api/auth.service.jsx";
import cloudinaryService from "../api/cloudinary.service.jsx";

const cld = new Cloudinary({ cloud: { cloudName: 'dg0ibsz9h' }, url: { secure: true } });

const Book = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [authorship, setAuthorship] = useState('');
    const [dop, setDop] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const handleLogout = (e) => {
        e.preventDefault();
        AuthService.logout();
        navigate('/login');
    }
    const handleProfile = (e) => {
        e.preventDefault();
        navigate('/profile');
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : '');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file first!');
            return;
        }
        const generatePublicId = () => {
            const uniqueId = Math.random().toString(36).substring(7);
            return `book_${uniqueId}`;
        };
        const publicId = generatePublicId();

        try {
            const response = await cloudinaryService(file,publicId);
            console.log('Upload successful:', response.data);
            setFileUrl(fileUrl);

            try {
                const bookResponse = await LibraryService.createBook({ title, file_url: publicId, authorship, dop });
                if (bookResponse) {
                    toast.success("Книга успешно создана");
                }
            } catch (error) {
                if (error.message === 'This book is already created.') {
                    toast.error('This book is already created.');
                } else {
                    toast.error('Creation error');
                }
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <form className="library-container" >
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

            <div className="main-container">
                <h1>Загрузить книгу</h1>
                <input
                    className="input-book"
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="input-book"
                    type="text"
                    placeholder="Автор"
                    value={authorship}
                    onChange={(e) => setAuthorship(e.target.value)}
                />
                <input
                    className="input-date"
                    type="date"
                    placeholder="Дата издания"
                    value={dop}
                    onChange={(e) => setDop(e.target.value)}
                />
                <label className="custom-file-upload">
                    <input
                        type="file"
                        className="add-file-button"
                        onChange={handleFileChange}
                        style={{ display: "none" }} // Скрыть стандартный элемент
                    />
                    Выбрать файл
                    {fileName && <p className="p">Выбранный файл: {fileName}</p>}
                </label>
                <button className="upl-file-button" onClick={handleUpload}>Загрузить книгу</button>
            </div>
        </form>
    );
};

export default Book;
