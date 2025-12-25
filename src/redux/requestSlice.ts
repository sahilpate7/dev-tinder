import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: {
        requests: []
    },
    reducers: {
        setRequests: (state, action) => {
            state.requests = action.payload;
        },
        removeRequest: (state, action) => {
            state.requests = state.requests.filter((request: any) => request._id !== action.payload);
        }
    }
});

export const { setRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;