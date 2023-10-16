import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { facebook, ninja } from "../services/api";

export const ExtendToken = createAsyncThunk(
  "extentToken",
  async (data: any, { rejectWithValue }) => {
    try {
      const Result = await axios.post(`${facebook}oauth/access_token?`, null, {
        params: {
          grant_type: "fb_exchange_token",
          client_id: data.Client_ID,
          client_secret: data.Client_Secret_Code,
          fb_exchange_token: data.access_token,
        },
      });
      Swal.fire(
        "Generated!",
        "Your Access Token Generated SuccussFully!",
        "success"
      );
      return {
        ["access_token"]: Result.data.access_token,
        ["Page_ID"]: data.pageID,
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
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("upload_preset", "Bhavu1432"); // Replace with your preset

      console.log(data);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dacofuonc/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const Responese = await axios.post(` ${facebook}${data.user_id}/media?`, {
        image_url: response.data.secure_url,
        caption: data.Caption,
        access_token: data.token,
      });
      const Result = await axios.post(
        ` ${facebook}${data.user_id}/media_publish?`,
        {
          creation_id: Responese.data.id,
          access_token: data.token,
        }
      );

      Swal.fire("Post!", "Your Photo Post SuccussFully!", "success");

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const InstaPostVideo = createAsyncThunk(
  "InstaPostVideo",
  async (data: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("upload_preset", "Bhavu1432"); // Replace with your preset

      console.log(data);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dacofuonc/video/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadResponse = await axios.post(
        `${facebook}${data.user_id}/media?`,
        {
          media_type: "VIDEO",
          video_url: response.data.secure_url,
          caption: data.Caption,
          access_token: data.token,
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 second
      const creationId = uploadResponse.data.id;

      const publishResponse = await axios.post(
        `${facebook}${data.user_id}/media_publish?`,
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
  async (chat: any, { rejectWithValue }) => {
    try {
      const Response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=AIzaSyBjctYmA81FbTuUWV23fd5SkZPqQnHWnjY",
        {
          prompt: { text: chat },
        }
      );
      if (Response.data.candidates) {
        return {
          message: Response.data.candidates[0].output,
          sender: "ChatGPT",
        };
      } else {
        return {
          message: `Something else,\nThis text doesn't exist !`,
          sender: "ChatGPT",
        };
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
);

export const FacebookImgPost = async (state: any, action: any) => {
  await axios
    .post(
      `${facebook}${state.UserData[0]["Page_ID"]}/photos`,
      {
        message: action.payload.Caption,
        source: action.payload.file,
        access_token: state.UserData[0]["access_token"],
      },
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
};

export const FacebookVideosPost = async (state: any, action: any) => {
  await axios
    .post(
      `${facebook}${state.UserData[0]["Page_ID"]}/videos?`,
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
};

//Condition Pending
export const InstagramPageID = async (state: any) => {
  console.log(state);

  state
    ? await axios
        .get(
          `${facebook}${state.UserData[0]["Page_ID"]}?fields=instagram_business_account&access_token=${state.UserData[0]["access_token"]}`
        )
        .then((res) => {
          navigator.clipboard.writeText(res.data.instagram_business_account.id);

          Swal.fire("Genrate!", "Your UserID Copied SuccussFully!", "success");
        })
        .catch((errr) => {
          console.log(errr);
        })
    : alert("Please Go to Facebook Authorization Complete fisrt !");
};

export const pageList = createAsyncThunk(
  "pageList",
  async (data: any, { rejectWithValue }) => {
    console.log(data);

    try {
      const Responese = await axios.get(
        `${facebook}me/accounts?access_token=${data.accessToken}`
      );
      Swal.fire(
        "Page List!",
        "Your Access Token Generated SuccussFully!",
        "success"
      );

      return Responese.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
