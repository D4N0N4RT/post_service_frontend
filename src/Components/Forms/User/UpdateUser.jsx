import React, { useState, useEffect } from "react";
import "../Authorization/registration.css"
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Store/Hooks/redux";
import { setErrorData } from "../../../Store/Reducers/UserReducer";
import ErrorItem from "../../Error/ErrorItem";

const UpdateUser = () => {
    const [user, setUser] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {userToken, userId, userRole} = useAppSelector((state)=>state.userReducer);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/users/${userId}`, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `${userToken}`
                },
            });
            const data = await response.json();
            console.log(data)
            if (response.status === 200) {
                setUser(data);
                setFirstName(user.name)
                setLastName(user.surname)
                setPassword(user.password)
                setPhone(user.phone)
                setCity(user.city)
                dispatch(setErrorData(''))
            } else {
                dispatch(setErrorData(data.message))
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/auth/edit`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ password, name: firstName, surname: lastName,
                phone, city })
        });

        const data = response.json();

        if (response.status === 200) {
            dispatch(setErrorData(''))
            navigate('/users/' + userId);
        } else {
            dispatch(setErrorData(data.message))
            navigate(`/users/${userId}/edit`);
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
                <button type="submit">Обновить данные профиля</button>
            </div>
        </form>
    );
};

export default UpdateUser;