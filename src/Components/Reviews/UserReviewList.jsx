import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import "./ReviewItem.css"
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/redux';
import { setErrorData } from '../../Store/Reducers/UserReducer';
import ErrorItem from '../Error/ErrorItem';

function UserReviewList(props) {
    const [reviews, setReviews] = useState([]);
    
    const dispatch = useAppDispatch();
    const {userToken} = useAppSelector((state)=>state.userReducer);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`http://localhost:8081/users/${props.user_id}/reviews?option=received`, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8081',
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

    return (
        <div className="rowContainer">
            <ErrorItem/>
            {reviews.map(review =>
                <ReviewItem key={review.id} review={review}/>
            )}
        </div>
    );
}

export default UserReviewList;