import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="about">
                <h3>О нас</h3>
                <p>Мы являемся сервисом для размещения частных объявлеий пользователей. Здесь вы можете разместить свое объявление или же связаться с продавцом и приобрести интересующее объявлление</p>
            </div>
            <div className="social">
                <h3>Follow Us On</h3>
                <ul>
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                </ul>
            </div>
            <div className="contact">
                <h3>Обратная связь</h3>
                <form>
                    <input type="text" placeholder="Ваше имя" />
                    <input type="email" placeholder="Ваш e-mail" />
                    <input type="tel" placeholder="Ваш телефон" />
                    <textarea placeholder="Ваше сообщение"></textarea>
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </footer>
    );
};

export default Footer;