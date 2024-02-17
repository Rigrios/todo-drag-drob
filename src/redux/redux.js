import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageReducer";


export let store = configureStore({
    reducer: {
        page: pageReducer,

    }
})


window.store = store

