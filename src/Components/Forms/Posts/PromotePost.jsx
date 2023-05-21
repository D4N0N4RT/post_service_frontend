import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Store/Hooks/redux";
import "./AddPost.css"
import { setErrorData } from "../../../Store/Reducers/UserReducer";
import ErrorItem from "../../Error/ErrorItem";

function PromotePost() {
    const {currentPost} = useAppSelector((state) => state.postReducer)
    const {userToken} = useAppSelector((state) => state.userReducer)

    const [promotion, setPromotion] = useState(0);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const promote = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts/${currentPost.id}/promote?promotion=${promotion}`, {
            method: 'PATCH',
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
            navigate(`/posts/${currentPost.id}`);
        } else {
            dispatch(setErrorData(data.message))
            navigate(`/posts/${currentPost.id}/promote`)
        }
    };

    return (
        <form/* onSubmit={handleSubmit}*/ className="add-post-form">
            <ErrorItem/>
            <div className="form-group">
                <label htmlFor="promotion">
                    Оплата:
                </label>
                <input 
                    className="post-input"
                    type="number" 
                    value={promotion} 
                    id="promotion"
                    onChange={(e) => setPromotion(Number(e.target.value))}
                />
            </div>
            <div className="form-group">
                <button onClick={promote} type="submit">Добавить объяление</button>
            </div>
        </form>
    )
}

export default PromotePost;