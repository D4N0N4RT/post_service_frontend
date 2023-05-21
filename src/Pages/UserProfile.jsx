import { useState, useEffect } from 'react';
import UserPostList from '../Components/Posts/UserPostList';
import { useAppDispatch, useAppSelector } from '../Store/Hooks/redux';
import "./UserProfile.css";
import UserReviewList from '../Components/Reviews/UserReviewList';
import { setErrorData, clearResults } from '../Store/Reducers/UserReducer';
import { useNavigate } from 'react-router-dom';
import ErrorItem from '../Components/Error/ErrorItem';
import { Link } from 'react-router-dom';
import AuthorReviewList from '../Components/Reviews/AuthorReviewList';

const UserProfile = () => {
    const [user, setUser] = useState([])
    const user_id = window.location.pathname.split('/').pop();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {userToken, userId, userRole, isLogin} = useAppSelector((state)=>state.userReducer);

    useEffect(() => {
        if (!isLogin) {
            navigate('/auth/login')
        }
        const fetchUser = async () => {
            const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/users/${user_id}`, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `${userToken}`

                },
            });
            const data = await response.json();
            console.log(data.name)
            if (response.status === 200) {
                setUser(data);
                dispatch(setErrorData(''))
            } else {
                dispatch(setErrorData(data.message))
            }
        };
        fetchUser();
    }, []);

    const logout = async () => {
        await dispatch(clearResults())
        navigate('/')
    }

    const EditProfile = () => {
        console.log(user_id, userId)
        if (user_id == userId && userRole == 'USER') {
            return (
                <div>
                    <button className='header-button' onClick={logout}>Выйти из аккаунта</button>
                    <button className='header-button' onClick={() => navigate(`/users/${userId}/edit`)}>Редактировать профиль</button>
                </div>
            );
        } else if (user_id == userId && userRole == 'ADMIN') {
            return (
                <div>
                    <button className='header-button' onClick={logout}>Выйти из аккаунта</button>
                    <button className='header-button' onClick={() => navigate(`/admin/add`)}>Добавить администратора</button>
                </div>
            );
        }else {
            return (
                <div>
                    <p>Электронная почта: {user.username}</p>
                    <p>Номер телефона: +7-{user.phone}</p>
                </div>
            )
        }
    }


    return (
        <div className="profile-container">
            <ErrorItem/>
            <div className="profile-header">
                <h2>My Profile</h2>
            </div>
            <div className="profile-content">
                <img src="https://placehold.co/150x150/000000/FFFFFF/png" alt="User Avatar" className="user-profile-avatar" />
                <div className="profile-details">
                    <h3>{user.name} {user.surname}</h3>
                    <p>Город: {user.city}</p>
                    <p>Дата регистрации: {user.registrationDate}</p>
                    <p>Рейтинг: {user.rating}</p>
                    <EditProfile/>
                </div>
                <div className='userPosts'>
                    <h3>Объявления пользователя</h3>
                    <UserPostList user_id={user_id}/>
                    <h3>Отзывы на пользователя</h3>
                    <UserReviewList user_id={user_id}/>
                    <h3>Отзывы от пользователя</h3>
                    <AuthorReviewList user_id={user_id}/>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;