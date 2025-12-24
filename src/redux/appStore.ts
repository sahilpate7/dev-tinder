import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsSlice from "./connectionsSlice";

const appStore = configureStore({
    reducer : {
        user: userSlice,
        feed : feedSlice,
        connections: connectionsSlice
    }
})

export default appStore;
