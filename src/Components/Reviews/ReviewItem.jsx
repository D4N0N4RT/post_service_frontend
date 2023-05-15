import React from 'react';
import "./ReviewItem.css";
import { useNavigate } from 'react-router-dom';
import { Rate } from 'antd';

function ReviewItem(props) {

    const navigate = useNavigate();

    return (
        <div className="review-row" onClick={() => navigate('/posts/' + props.review.post.id)}>
            <img src="https://placehold.co/350x220/000000/FFFFFF/png" className="image"/>
            <div className='info'>
                <div className='main'>
                    <div className='title'>
                        {props.review.post.title}
                    </div>
                    <Rate className='rating' disabled defaultValue={props.review.grade}/>
                </div>
                <div className='price'>
                    {props.review.post.price} руб.
                </div>
                <div className='other'>
                    <h5>Автор отзыва: {props.review.reviewAuthor.name} {props.review.reviewAuthor.surname}</h5>
                    <h6>Отзыв написан: {props.review.time}</h6>
                    <div className='review-content'>{props.review.content}</div>
                </div>
            </div>
        </div>
    );
}

export default ReviewItem;