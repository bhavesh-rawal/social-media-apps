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

      const publishResponse = await axios.post(
        `https://graph.facebook.com/v17.0/${data.user_id}/media_publish?`,
        {
          creation_id: creationId,
          access_token: data.token,
        }
      );

      Swal.fire("Post!", "Your Video Post SuccussFully!", "success");
      return publishResponse.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const QuotesGenerate = createAsyncThunk(
  "QuotesGenerate",
  async (chat: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/thesaurus?word=${chat}`,
        {
          headers: {
            "X-Api-Key": "riB2ysaiPMXUBBBYE6k9mQ==854KIpb7YIkjJOzN",
          },
        }
      );

      const synonyms = [chat, ...response.data.synonyms] || [];

      let quotes: any = [];

      for (const synonym of synonyms) {
        const quoteResponse = await axios.get(
          `https://api.api-ninjas.com/v1/quotes?category=${synonym}&limit=10`,
          {
            headers: {
              "X-Api-Key": "riB2ysaiPMXUBBBYE6k9mQ==854KIpb7YIkjJOzN",
            },
          }
        );

        quotes = [...quoteResponse.data, ...quotes];
      }
      console.log(quotes.length );

      if (quotes.length > 0) {
        return quotes;
      } else {
        console.log(quotes.length);

        return [
          {
            quote: `Something else,\nThis type doesn't exist !`,
            type: "bot",
          },
        ];
      }
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(error);
    }
  }
);

const userSlice: any = createSlice({
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
        })
        .catch((errr) => {
          console.log(errr);
        });
    },
    GenrateuserID: (state, action) => {
      axios
        .get(
          `https://graph.facebook.com/v17.0/${state.UserData[0]["Page_ID"]}?fields=instagram_business_account&access_token=${state.UserData[0]["access_token"]}`
        )
        .then((res) => {
          navigator.clipboard.writeText(res.data.instagram_business_account.id);

          Swal.fire("Genrate!", "Your UserID Copied SuccussFully!", "success");
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
      .addCase(QuotesGenerate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(QuotesGenerate.fulfilled, (state, action) => {
        state.UserData = action.payload;
        console.log(action.payload);

        // state.UserData = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(QuotesGenerate.rejected, (state, action) => {
        // state.UserData = action.payload;

        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { PostImageFB, PostVideosFB, GenrateuserID } = userSlice.actions;
export default userSlice.reducer;
