import { createSlice } from "@reduxjs/toolkit";
import {
  ExtendToken,
  FacebookImgPost,
  FacebookVideosPost,
  InstaPostImage,
  InstaPostVideo,
  InstagramPageID,
  QuotesGenerate,
  pageList,
} from "./actions";

interface PostState {
  UserData: any[];
  loading: boolean;
  error: any;
}

const initialState: PostState = {
  UserData: [],
  loading: false,
  error: null,
};

const userSlice: any = createSlice({
  name: "users",
  initialState,
  reducers: {
    PostImageFB: (state, action) => {
      FacebookImgPost(state, action);
    },
    PostVideosFB: (state, action) => {
      FacebookVideosPost(state, action);
    },
    GenrateuserID: (state) => {
      InstagramPageID(state);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(ExtendToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ExtendToken.fulfilled, (state, action) => {
        state.UserData = [action.payload];
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
        // state.UserData.push(action.payload.data)
        state.error = null;
        state.loading = false;
      })
      .addCase(InstaPostImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(InstaPostVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(InstaPostVideo.fulfilled, (state, action) => {
        // state.UserData.push(action.payload.data)
        state.error = null;
        state.loading = false;
      })
      .addCase(InstaPostVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(QuotesGenerate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(QuotesGenerate.fulfilled, (state, action) => {
        state.UserData = [action.payload];
        state.error = null;
        state.loading = false;
      })
      .addCase(QuotesGenerate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(pageList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(pageList.fulfilled, (state, action) => {
        // state.UserData.push({ ["Pages"]: action.payload });
        localStorage.setItem("Pages", JSON.stringify(action.payload));
        state.error = null;
        state.loading = false;
      })
      .addCase(pageList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { PostImageFB, PostVideosFB, GenrateuserID } = userSlice.actions;
export default userSlice.reducer;
