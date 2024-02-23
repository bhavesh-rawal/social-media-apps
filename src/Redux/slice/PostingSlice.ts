import { createSlice } from "@reduxjs/toolkit";
import {
  ExtendToken,
  FacebookImgPost,
  FacebookVideosPost,
  InstaPostImage,
  InstaPostVideo,
  pageList,
} from "../actions/actions";
import { PostCaption } from "../../types/actions/Posting";
export interface userItem {
  email: string;
  password: string;
}

export interface pageItem {
  access_token: string;
  token_type: string;
  PageName: string;
  PageID: string;
}

export interface PostState {
  user?: userItem;
  pageData?: pageItem[];
  selectPage?: pageItem;
  captions?: PostCaption;
  loading: boolean;
  error: any;
}

const initialState: PostState = {
  user: undefined,
  pageData: undefined,
  selectPage: undefined,
  captions: undefined,
  loading: false,
  error: null,
};

const PostingSlice: any = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    PageSave: (state, action) => {
      state.selectPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(ExtendToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ExtendToken.fulfilled, (state, action) => {
        localStorage.setItem("PagesID", JSON.stringify([action.payload]));
        state.error = null;
        state.loading = false;
      })
      .addCase(ExtendToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(InstaPostImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InstaPostImage.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(InstaPostImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(FacebookImgPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FacebookImgPost.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(FacebookImgPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(FacebookVideosPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FacebookVideosPost.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(FacebookVideosPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(InstaPostVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InstaPostVideo.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(InstaPostVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(pageList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(pageList.fulfilled, (state, action) => {
        localStorage.setItem("pageList", JSON.stringify(action.payload));
        state.error = null;
        state.loading = false;
      })
      .addCase(pageList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, PageSave } = PostingSlice.actions;
export default PostingSlice.reducer;
