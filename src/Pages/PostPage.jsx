import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/Hooks/redux";
import "./PostPage.css"
import "../Components/Posts/PostItem.css"
import PostList from "../Components/Posts/PostList";
import { setErrorData } from "../Store/Reducers/UserReducer";
import ErrorItem from "../Components/Error/ErrorItem";

function ExcPostPage() {
    const post_id = window.location.pathname.split('/').pop();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {userId, userToken,isLogin} = useAppSelector(state=>state.userReducer);
    const {currentPost} = useAppSelector((state) => state.postReducer)

    useEffect(() => {
        if (!isLogin) {
            navigate('/auth/login');
        }
    })

    const buyPost = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts/${post_id}/buy`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `${userToken}`
            }
        });
        const data = response.json();
        if (response.status === 200) {
            dispatch(setErrorData(''))
            navigate('/posts/' + post_id);
        } else {
            dispatch(setErrorData(data.message))
            navigate('/auth/login');
        }
    };

    function PostButton() {
        if (userId === currentPost.seller.id && !currentPost.sold) {
            return (
                <div>
                    <button className="post-button" onClick={() => navigate(`/posts/${post_id}/edit`)}>Изменить объявление</button>
                    <button className="post-button" onClick={() => navigate(`/posts/${post_id}/promote`)}>Проплатить объявление</button>
                </div>
            )
        } else if (userId !== currentPost.seller.id && !currentPost.sold) {
            return (
            <div>
                <button className="post-button" onClick={buyPost}>Купить объявление</button>
            </div>
            )
        } else if (userId !== currentPost.seller.id && currentPost.sold && currentPost.buyerId === userId) {
            return (
                <div>
                    <button className="post-button" onClick={() => navigate(`/posts/${post_id}/review`)}>Оценить объявление</button>
                </div>
            )
        }
    }

    return (
        <div className="post-container">
            <ErrorItem/>
            <div className="post-content">
                <div className='post-details'>
                    <h2>{currentPost.title}</h2>
                    <img src="https://placehold.co/1000x650/000000/FFFFFF/png" alt="User Avatar" className="post-avatar" />
                    <div className='details-section'>
                        <h2>Цена</h2>
                        <h3>{currentPost.price} руб.</h3>
                    </div>
                    <h3>Описание</h3>
                    <h4>{currentPost.description}</h4>
                    <h3>Другие объявления</h3>
                    <PostList/>
                </div>
                <div>
                    <div className="button-image-div">
                        <PostButton/>
                    </div>
                    <div className="seller-profile">
                        <img src="https://placehold.co/100x100/000000/FFFFFF/png" alt="User Avatar" className="profile-avatar" onClick={() => navigate(`/users/${currentPost.seller.id}`)}/>
                        <div className="seller-details">
                            <h3>Продавец </h3>
                            <h5>Имя: {currentPost.seller.name} {currentPost.seller.surname}</h5>
                            <h5>Рейтинг: {currentPost.seller.rating}</h5>
                            <h5>Дата регистрации: {currentPost.seller.registrationDate}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcPostPage;