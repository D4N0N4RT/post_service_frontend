import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/redux';

const LoginButton = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {userId, isLogin} = useAppSelector(state=>state.userReducer);


    const logInContent = (
        <div className="search">
            <button className='header-button' onClick={() => navigate(`/auth/login`)}>Вход и регистрация</button>
        </div>
    );
    
    const userProfileContent = (
        <div className="search">
            <button className='header-button' onClick={() => navigate(`/users/${userId}`)}>Личный аккаунт</button>
        </div>
    );

    if (isLogin) {
        return userProfileContent;
    }
    return logInContent;
};

export default LoginButton;