import React from 'react';
import "./AdminPostItem.css";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/redux';
import { setErrorData } from '../../Store/Reducers/UserReducer';

function AdminPostItem(props) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {userToken} = useAppSelector((state) => state.userReducer);

    const deletePost = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/admin/posts/${props.post.id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `${userToken}`
            }
        });
        const data = await response.json();
        
        if (response.status === 200) {
            dispatch(setErrorData(''))
            navigate('/admin');
        } else {
            dispatch(setErrorData(data.message))
            navigate('/admin');
        }
    };

    return (
        <div className="admin-row" >
            <img src="https://placehold.co/350x220/000000/FFFFFF/png" className="image"/>
            <div className='info'>
                <div className='main'>
                    <div className='title'>
                        {props.post.title}
                    </div>
                    <button onClick={deletePost} className='delete'>Удалить объявление</button>
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

export default AdminPostItem;