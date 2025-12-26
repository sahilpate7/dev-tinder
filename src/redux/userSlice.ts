import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (_, action) => {
            return action.payload
        },
        removeUser: () => null
    }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer