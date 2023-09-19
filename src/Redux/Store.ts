import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./Slice_Posts";

export const Store = configureStore({
    reducer: {
        Post: PostSlice
    }
})