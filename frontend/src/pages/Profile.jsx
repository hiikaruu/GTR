import React, { useState } from 'react';
import './Profile.css';
import AuthService from "../api/auth.service.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState({
        avatar: '',
        bio: ''
    });
    const [avatarPreview, setAvatarPreview] = useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    }
    const handleProfile = () => {
        navigate('/profile');
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setProfile({ ...profile, avatar: file });
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleBioChange = (e) => {
        setProfile({ ...profile, bio: e.target.value });
    };

    const handleSaveProfile = () => {
        // Implement save profile logic here
        console.log('Profile saved:', profile);
    };

    return (
        <form className="profile-container">
            {isOpen && (
                <div className="profile-menu" role="tooltip">
                    <button className="menu-button">Профиль</button>
                    <button className="menu-button" onClick={handleLogout}>Выход</button>
                </div>
            )}
            <div className="library-header">
                <h1>GTR | Profile</h1>
                <input type="text" className="search-bar" placeholder="Search..." />
                <div className="user-profile" onClick={toggleMenu}>
                    User Profile
                </div>
            </div>
            <div className="profile-form">
                <h2 className="h2">UsernameA</h2>
                <div className="avatar-upload">
                    <label htmlFor="avatar">
                        <img src={avatarPreview || 'default-avatar.png'} alt="Аватар" className="avatar-preview" />
                        <input type="file" id="avatar" onChange={handleAvatarChange} />
                    </label>
                </div>
                <div className="bio-section">
                    <textarea
                        value={profile.bio}
                        onChange={handleBioChange}
                        placeholder="Расскажите что-нибудь о себе..."
                        className="bio-textarea"
                    />
                </div>
                <button onClick={handleSaveProfile} className="save-button">Сохранить</button>
            </div>
        </form>
    );
};

export default Profile;
