import React, {useState} from 'react';
import { FaUserAstronaut, FaLock } from "react-icons/fa";
import './AuthForm.css';
import AuthService from "../api/auth.service.jsx";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('')
    const navigate = useNavigate();
    const switchToLoginForm = () => {
        navigate('/login');
    }
    const registrationHandler = async (e) => {
        e.preventDefault();
        if (!email || !password || !username) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const response = await AuthService.register({ email, password, username });
            if (response) {
                toast.success("Аккаунт успешно создан");
                navigate('/login')
            }
        } catch (error) {
            if (error.message === 'This email is already registered.') {
                toast.error('This email is already registered.');
            } else {
                toast.error('Registration error');
            }
        }
    }
    return (
            <form  className="wrapper" onSubmit={registrationHandler}>
                <h1>
                    Registration
                </h1>
                <div
                    className="input-box">
                    <input type="text"
                           placeholder="email"
                           onChange={(e) =>
                               setEmail(e.target.value)}/>
                    <FaUserAstronaut className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text"
                           placeholder="name"
                           onChange={(e) =>
                               setUsername(e.target.value)}/>
                </div>
                <div className="input-box">
                    <input type="text"
                           placeholder="password"
                           onChange={(e) =>
                               setPassword(e.target.value)}/>
                    <FaLock className="icon"/>
                </div>
                <button type="submit">register</button>
                <div className="register-label">
                    <label> You already have an account? </label>
                </div>
                <button type="button" onClick={switchToLoginForm}>
                    login
                </button>
            </form>
    );
}
export default Register;