import React from 'react';
import "./PostRow.css"
import PostRow from "./PostRow";
import {useAppSelector} from "../../Store/Hooks/redux";
import ErrorItem from '../Error/ErrorItem';


function FilteredPostList(props) {
    const {posts} = useAppSelector((state)=>state.postReducer)
    // const {userData, isLogin, userToken} = useAppSelector(state=>state.userReducer);

    return (
        <div className="row-container">
            {posts.map(post =>
                <PostRow key={post.id} post={post}/>
            )}
        </div>
    );
}

export default FilteredPostList;