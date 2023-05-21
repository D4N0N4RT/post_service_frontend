import React, { useState } from "react";
import "./registration.css"
import {Link, useNavigate} from "react-router-dom";
import { useAppDispatch } from "../../../Store/Hooks/redux";
import { changeLogin, setErrorData, changeUserCredentials, changeUserToken, changeUserRole, changeUserId, changeRefreshToken } from "../../../Store/Reducers/UserReducer";
import ErrorItem from "../../Error/ErrorItem";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const reducersCall = (data) => {
        console.log(data);
        dispatch(changeLogin(true))
        dispatch(changeUserCredentials(data));
        dispatch(changeUserToken(data.accessToken))
        dispatch(changeUserRole(data.role))
        dispatch(changeUserId(data.id))
        dispatch(changeRefreshToken(data.refreshToken))
    }

    const login = async (event) => {
        event.preventDefault();

        console.log(email, password)
        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ username: email, password })
        });
        const data = await response.json();
        
        if (response.status === 200) {
            reducersCall(data);
            navigate('/');
        } else if (response.status === 401) {
            dispatch(setErrorData('Неправильный логин или пароль!'))
            navigate('/auth/login');
        } else {
            dispatch(setErrorData(data.message))
            navigate('/auth/login');
        }
    };

    
    return (
        <form /*onSubmit={login}*/ className="auth-form">
            <ErrorItem/>
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
                <button onClick={login} type="submit">Войти</button>
            </div>
            <div className="form-group">
                <div><Link to={"/auth/registration"}>Зарегистрироваться</Link></div>
            </div>
        </form>
    );
};

export default LoginForm;