import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import "./ReviewItem.css"
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/redux';
import { setErrorData } from '../../Store/Reducers/UserReducer';
import ErrorItem from '../Error/ErrorItem';

function AuthorReviewList(props) {
    const [reviews, setReviews] = useState([]);
    
    const dispatch = useAppDispatch();
    const {userToken} = useAppSelector((state)=>state.userReducer);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/users/${props.user_id}/reviews?option=written`, {
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
                setReviews(data);
                dispatch(setErrorData(''))
            } else {
                dispatch(setErrorData(data.message))
            }
        };
        fetchReviews();
    }, [userToken, dispatch, props.user_id]);

    if (reviews.length === 0) {
        return (
            <div className="nothing-container">
                <h4>
                Отзывы отсутствуют
                </h4>
            </div>
        )
    }

    return (
        <div className="review-container">
            {reviews.map(review =>
                <ReviewItem key={review.id} review={review}/>
            )}
        </div>
    );
}

export default AuthorReviewList;