import React from 'react';
import "./PostRow.css";
import { useNavigate } from 'react-router-dom';
import { setCurrentPost } from '../../Store/Reducers/PostReducer';
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/redux';
import { setErrorData } from '../../Store/Reducers/UserReducer';

function PostRow(props) {
    const post_id = window.location.pathname.split('/').pop();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {userToken} = useAppSelector(state=>state.userReducer);

    const fetchPost = async () => {
        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts/${props.post.id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `${userToken}`
            }
        });
        const data = await response.json();
        if (response.status === 200) {
            dispatch(setErrorData(''))
            dispatch(setCurrentPost(data))
            navigate(`/posts/${props.post.id}`)
        } else {
            dispatch(setErrorData(data.message))
        }
    };

    return (
        <div className="post-row" onClick={fetchPost}>
            <img src="https://placehold.co/350x220/000000/FFFFFF/png" className="image"/>
            <div className='row-info'>
                <div className='title'>
                    {props.post.title}
                </div>
                <div className='price'>
                    {props.post.price} руб.
                </div>
                <div className='other'>
                    <h5>Категория: {props.post.category.name}</h5>
                    <h5>Город: {props.post.city}</h5>
                    <h5>Дата размещения: {props.post.postingDate}</h5>
                </div>
            </div>
        </div>
    );
}

export default PostRow;