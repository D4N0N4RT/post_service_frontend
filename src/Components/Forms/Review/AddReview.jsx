import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Store/Hooks/redux";
import { setErrorData } from "../../../Store/Reducers/UserReducer";
import ErrorItem from "../../Error/ErrorItem";
import "./AddReview.css"

function AddReview() {
    const [content, setContent] = useState('');
    const [grade, setGrade] = useState(0);

    const post_id = window.location.pathname.split('/').pop().pop();

    const navigate = useNavigate();
    const dispatch = useAppDispatch(); 

    const {userToken} = useAppSelector((state)=>state.userReducer);

    const addReview = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts/${post_id}/review`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `${userToken}`
            },
            body: JSON.stringify({ content, grade })
        });

        const data = response.json();

        if (response.status === 200) {
            dispatch(setErrorData(''))
            navigate('/posts/' + post_id);
        } else {
            dispatch(setErrorData(data.message))
            navigate(`posts/${post_id}/review`);
        }
    };

    return (
        <form/* onSubmit={handleSubmit}*/>
            <ErrorItem/>
            <div className="form-group">
                <label>
                    Комментарий:
                    <textarea type="text" className="review-input-area" value={content} onChange={(e) => setContent(e.target.value)}/>
                </label>
            </div>
            <div className="form-group">
                <label>
                    Оценка:
                    <input type="number" classname="review-input" value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
                </label>
            </div>
            <div className="form-group">
                <button onClick={addReview} type="submit">Добавить объяление</button>
            </div>
        </form>
    );
}

export default AddReview;