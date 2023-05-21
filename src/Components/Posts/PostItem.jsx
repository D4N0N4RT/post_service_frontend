import React from 'react';
import "./PostItem.css";
import { useNavigate } from 'react-router-dom';
import { setCurrentPost } from '../../Store/Reducers/PostReducer';
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/redux';
import { setErrorData } from '../../Store/Reducers/UserReducer';

function PostItem(props) {

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
        <div className="post-card" onClick={fetchPost}>
          <img src="https://placehold.co/250x170/000000/FFFFFF/png" className="item-image"/>
          <div className="main">
            {props.post.title}<br/>{props.post.price} руб.
          </div>
          <div className="info">
            Продавец: {props.post.sellerEmail}<br/>
            Город: {props.post.city}<br/>
            Дата размещения: {props.post.postingDate}
          </div>
        </div>
    );
}

export default PostItem;