import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

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

export const ExtendToken = createAsyncThunk(
  "extentToken",
  async (data: any, { rejectWithValue }) => {
    try {
      const Responese = await axios.get(
        `https://graph.facebook.com/${data.Page_ID}?fields=access_token&access_token=${data.userToken}`
      );
      const Result = await axios.post(
        `https://graph.facebook.com/v17.0/oauth/access_token`,
        null,
        {
          params: {
            grant_type: "fb_exchange_token",
            client_id: data.Client_ID,
            client_secret: data.Client_Secret_Code,
            fb_exchange_token: Responese.data.access_token,
          },
        }
      );
      Swal.fire(
        "Generated!",
        "Your Access Token Generated SuccussFully!",
        "success"
      );

      return {
        ["access_token"]: Result.data.access_token,
        ["Page_ID"]: data.Page_ID,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const InstaPostImage = createAsyncThunk(
  "InstaPostImage",
  async (data: any, { rejectWithValue }) => {
    console.log(data);
    try {
      const Responese = await axios.post(
        ` https://graph.facebook.com/v17.0/${data.user_id}/media?`,
        {
          image_url: data.InstaImage,
          caption: data.Instacaption,
          access_token: data.token,
        }
      );
      const Result = await axios.post(
        ` https://graph.facebook.com/v17.0/${data.user_id}/media_publish?`,
        {
          creation_id: Responese.data.id,
          access_token: data.token,
        }
      );

      Swal.fire("Post!", "Your Photo Post SuccussFully!", "success");

      return Result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const InstaPostVideo = createAsyncThunk(
  "InstaPostVideo",
  async (data: any, { rejectWithValue }) => {
    console.log(data);
    try {
      // Step 1: Upload the video
      const uploadResponse = await axios.post(
        `https://graph.facebook.com/v17.0/${data.user_id}/media?`,
        {
          media_type: "VIDEO",
          video_url: data.Video_url,
          caption: data.Instacaption,
          access_token: data.token,
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 second
      const creationId = uploadResponse.data.id;
      console.log("Media :", uploadResponse);

      const publishResponse = await axios.post(
        `https://graph.facebook.com/v17.0/${data.user_id}/media_publish?`,
        {
          creation_id: creationId,
          access_token: data.token,
        }
      );
      console.log(publishResponse);

      Swal.fire("Post!", "Your Video Post SuccussFully!", "success");
      return publishResponse.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const TwitterTweet = createAsyncThunk(
  "TwitterTweet",
  async (data: any, { rejectWithValue }) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("grant_type", "client_credentials");

      const response = await axios.post(
        "https://api.twitter.com/oauth2/token",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          auth: {
            username: data.Api_Key,
            password: data.Api_Secret_Key,
          },
        }
      );

      const bearerToken = response.data.access_token;
      console.log(response);

      const tweetResponse = await axios.post(
        "https://api.twitter.com/2/tweets",
        {
          status: data.tweetText,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      Swal.fire("Post!", "Your Tweet Post SuccussFully!", "success");
      console.log(tweetResponse);

      return tweetResponse.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice:any = createSlice({
  name: "users",
  initialState,
  reducers: {
    PostImageFB: (state, action) => {
      const formData = new FormData();
      formData.append("access_token", state.UserData[0]["access_token"]);
      formData.append("source", action.payload.file, action.payload.file.name);
      formData.append("message", action.payload.Caption);

      axios
        .post(
          `https://graph.facebook.com/${state.UserData[0]["Page_ID"]}/photos?`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          Swal.fire("Post!", "Your Photo Post SuccussFully!", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    PostVideosFB: (state, action) => {
      axios
        .post(
          `https://graph-video.facebook.com/v17.0/${state.UserData[0]["Page_ID"]}/videos?`,
          {
            description: action.payload.Caption,
            source: action.payload.file,
            access_token: state.UserData[0]["access_token"],
            file_size: 22420886,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          Swal.fire("Post!", "Your Video Post SuccussFully!", "success");
          console.log(res);
        })
        .catch((errr) => {
          console.log(errr);
        });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(ExtendToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ExtendToken.fulfilled, (state, action) => {
        state.UserData.push(action.payload);
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

      .addCase(TwitterTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TwitterTweet.fulfilled, (state, action) => {
        // state.UserData.push(action.payload.data)
        state.error = null;
        state.loading = false;
      })
      .addCase(TwitterTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { PostImageFB, PostVideosFB } = userSlice.actions;
export default userSlice.reducer;
