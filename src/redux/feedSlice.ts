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
        removePosts: (state) => {
            state.posts = []
        }
    }
})

export const {setPosts, removePosts} = feedSlice.actions;
export default feedSlice.reducer