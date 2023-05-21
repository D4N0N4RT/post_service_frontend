import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/Hooks/redux';
import { setErrorData } from '../Store/Reducers/UserReducer';
import ErrorItem from '../Components/Error/ErrorItem';
import { setAllPosts } from '../Store/Reducers/PostReducer';
import { useNavigate } from 'react-router-dom';
import AdminPostItem from '../Components/Posts/AdminPostItem';
import './AdminPage.css'

function AdminPage() {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {userToken, userRole} = useAppSelector((state) => state.userReducer);
    const {posts} = useAppSelector((state) => state.postReducer)

    useEffect(() => {
        if (userRole !== 'ADMIN') {
            navigate('/')
        }
        const fetchPosts = async () => {
            const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts`, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `${userToken}`
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                console.log(data)
                dispatch(setAllPosts(data))
                dispatch(setErrorData(''))
            } else {
                dispatch(setErrorData(data.message))
            }
        };
        fetchPosts();
    }, [userToken, dispatch]);

    return (
        <div className="rowContainer">
            <ErrorItem/>
            {posts && posts.map(post =>
                <AdminPostItem key={post.id} post={post}/>
            )}
        </div>
    );
}

export default AdminPage;