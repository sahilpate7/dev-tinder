import { createSlice } from "@reduxjs/toolkit"

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        posts: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post: any) => post._id !== action.payload)
        },
        emptyPosts: (state) => {
            state.posts = []
        }
    }
})

export const {setPosts, removePost, emptyPosts} = feedSlice.actions;
export default feedSlice.reducer