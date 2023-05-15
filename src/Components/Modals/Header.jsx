import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";

const Header = () => {

    return (
        <header>
            <div className="logo">
                {/* <img src="./logo.svg" alt="Logo Image" /> */}
                <span>MireAvito</span>
            </div>
            <nav>
                <ul>
                    <li><Link to={"/"}>Главная страница</Link></li>
                    <li><Link to={"/posts"}>Объявления</Link></li>
                    <li><Link to={"/posts/add"}>Разместить объявление</Link></li>
                    <li><Link to={"/admin"}>Панель администратора</Link></li>
                </ul>
            </nav>
            <LoginButton/>
        </header>
    );
};

export default Header;