import React, { useState } from "react";
import "./registration.css"
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../Store/Hooks/redux";
import { setErrorData } from "../../../Store/Reducers/UserReducer";
import ErrorItem from "../../Error/ErrorItem";

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/auth/registration`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ username: email, password, name: firstName, surname: lastName,
                phone, city })
        });
        const data = response.json();

        if (response.status === 200) {
            dispatch(setErrorData(''))
            navigate('/auth/login');
        } else {
            dispatch(setErrorData(data.message))
            navigate('/auth/registration');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <ErrorItem/>
            <div className="form-group">
                <label htmlFor="first-name">Имя:</label>
                <input
                    className='login-input'
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="last-name">Фамилия:</label>
                <input
                    className='login-input'
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Электронная почта:</label>
                <input
                    className='login-input'
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input
                    className='login-input'
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Номер телефона:</label>
                <input
                    className='login-input'
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Город:</label>
                <input
                    className='login-input'
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className="form-group">
                <button type="submit">Зарегистрироваться</button>
            </div>
            <div className="form-group">
                <a><Link to={"/auth/login"}>Войти в аккаунт</Link></a>
            </div>
        </form>
    );
};

export default RegistrationForm;