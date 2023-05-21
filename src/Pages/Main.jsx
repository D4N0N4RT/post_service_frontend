import React, {useEffect} from "react";
import PostList from "../Components/Posts/PostList";
import "../Components/Posts/PostItem.css"
import { useAppDispatch } from "../Store/Hooks/redux";
import { setAllPosts } from "../Store/Reducers/PostReducer";
import { setErrorData } from "../Store/Reducers/UserReducer";

function Main() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts`, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*'
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                dispatch(setAllPosts(data));
                dispatch(setErrorData(''))
            } else {
                dispatch(setErrorData(response.body))
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <div className="pageContainer">
                <h2>Объявления пользователей</h2>
                <PostList/>
            </div>
        </div>
    );
}

export default Main;