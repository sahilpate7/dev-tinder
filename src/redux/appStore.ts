import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsSlice from "./connectionsSlice";
import requestSlice from "./requestSlice";

const appStore = configureStore({
    reducer : {
        user: userSlice,
        feed : feedSlice,
        connection: connectionsSlice,
        request: requestSlice
    }
})

export default appStore;
