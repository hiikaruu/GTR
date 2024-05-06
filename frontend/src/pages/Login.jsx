import React, {useContext, useState} from 'react';
import { FaUserAstronaut, FaLock} from "react-icons/fa";
import './AuthForm.css';
import AuthService from "../api/auth.service.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const Login= () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const switchToRegisterForm = () => {
        navigate('/register');
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const token = await AuthService.login({ email, password});
            if (token) {
                toast.success("Login is successful");
                navigate('/gtr');
            }
        } catch (error) {
            toast.error(error.toString());
        }
    }
    return(
            <form className="wrapper" onSubmit={loginHandler}>
                <h1>
                    Login
                </h1>
                <div
                    className="input-box">
                    <input type="text"
                           placeholder="email"
                           onChange={(e)=>
                               setEmail(e.target.value)}/>
                    <FaUserAstronaut className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text"
                           placeholder="password"
                           onChange={(e)=>
                               setPassword(e.target.value)}/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/> Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">login</button>
                <div className="register-label">
                    <label> Don't you have an account? </label>
                </div>
                <button type="button" className="register" onClick={switchToRegisterForm}>register </button>
            </form>
    );
}
export default Login;