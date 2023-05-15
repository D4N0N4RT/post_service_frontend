import React, { useState, useEffect } from 'react';
import "./PostItem.css"
import PostItem from "./PostItem";
import {useAppSelector} from "../../Store/Hooks/redux";
import ErrorItem from '../Error/ErrorItem';


function PostList() {
    const {posts} = useAppSelector((state)=>state.postReducer)
    // const {userData, isLogin, userToken} = useAppSelector(state=>state.userReducer);

    return (
        <div className="cardsContainer">
            <ErrorItem/>
            {posts.map(post =>
                <PostItem key={post.id} post={post}/>
            )}
        </div>
    );
}

export default PostList;