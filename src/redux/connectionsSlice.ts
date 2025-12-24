import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: {
        connections: []
    },
    reducers: {
        setConnections: (state, action) => {
            state.connections = action.payload
        }
    }
})

export const { setConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;

