import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
    reducer : {

    }
})

export default appStore;
export type RootState = ReturnType<typeof appStore.getState>
