import React, { useState, useEffect } from 'react';
import PostRow from "./PostRow";
import "./PostRow.css"
import { useAppSelector, useAppDispatch } from '../../Store/Hooks/redux';
import { setErrorData } from '../../Store/Reducers/UserReducer';
import ErrorItem from '../Error/ErrorItem';

function UserPostList(props) {
    const [posts, setPosts] = useState([]);
    
    const dispatch = useAppDispatch();
    const {userToken} = useAppSelector((state)=>state.userReducer);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUnsoldPosts = async () => {
            const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/users/${props.user_id}/posts?sold=false`, {
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
                setPosts(data);
                dispatch(setErrorData(''))
            } else {
                dispatch(setErrorData(data.message))
            }
        };
        fetchUnsoldPosts();
    }, [userToken, dispatch, props.user_id]);

    if (posts.length === 0) {
        return (
            <div className="nothing-container">
                <h4>
                Объявления отсутствуют
                </h4>
            </div>
        )
    }

    return (
        <div className="row-container">
            {posts.map(post =>
                <PostRow key={post.id} post={post}/>
            )}
        </div>
    );
}

export default UserPostList;