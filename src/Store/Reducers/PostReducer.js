import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    posts: [],
    currentPost: [],
    currentCategory: '',
    title: '',
    city: '',
    minPrice: 0,
    maxPrice: 0,
    sortOption: 0 
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        changeLogin(state, action) {
            state.name = action.payload;
        },

        setAllPosts(state, action) {
            state.posts = action.payload;
        },
        setCurrentPost(state, action) {
            state.currentPost = action.payload
        },
        setFilter(state, action) {
            state.currentCategory = action.payload.category;
            state.title = action.payload.title;
            state.city = action.payload.city;
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
            state.sortOption = action.payload.sortOption;
        }
    },
});

export const {setAllPosts, setCurrentPost, setFilter} = postSlice.actions;
export default postSlice.reducer;