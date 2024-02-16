import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { facebook } from "../../services/api";
import { facebookImageDataParams } from "../../types/actions/Posting";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/Firebase";

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
        "Generated Token!",
        "Page Access Token Generated SuccussFully!",
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
  async (data: facebookImageDataParams, { rejectWithValue }) => {
    try {
      const IG_user = await axios.get(
        `${facebook}${data.PageID}?fields=instagram_business_account&access_token=${data.access_token}`
      );
      const storageRef = ref(storage, `InstagramPost/Photos`);
      const snapshot = await uploadBytes(storageRef, data.file);
      const starsRef = ref(storage, snapshot.metadata.fullPath);
      const url = await getDownloadURL(starsRef);
      if (url) {
        const Responese = await axios.post(
          `${facebook}${IG_user.data.instagram_business_account.id}/media?`,
          {
            image_url: url,
            caption: data.Caption,
            access_token: data.access_token,
          }
        );

        const Result = await axios.post(
          `${facebook}${IG_user.data.instagram_business_account.id}/media_publish?`,
          {
            creation_id: Responese.data.id,
            access_token: data.access_token,
          }
        );
        return Result.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const InstaPostVideo = createAsyncThunk(
  "InstaPostVideo",
  async (data: facebookImageDataParams, { rejectWithValue }) => {
    try {
      const IG_user = await axios.get(
        `${facebook}${data.PageID}?fields=instagram_business_account&access_token=${data.access_token}`
      );

      const storageRef = ref(storage, `InstagramPost/Reels`);
      const snapshot = await uploadBytes(storageRef, data.file);
      const starsRef = ref(storage, snapshot.metadata.fullPath);
      const url = await getDownloadURL(starsRef);
      if (url) {
        const uploadResponse = await axios.post(
          `${facebook}${IG_user.data.instagram_business_account.id}/media?`,
          {
            media_type: "REELS",
            video_url: url,
            caption: data.Caption,
            access_token: data.access_token,
          }
        );
        await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 second
        const creationId = uploadResponse.data.id;

        const publishResponse = await axios.post(
          `${facebook}${IG_user.data.instagram_business_account.id}/media_publish?`,
          {
            creation_id: creationId,
            access_token: data.access_token,
          }
        );
        return publishResponse.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const FacebookImgPost = createAsyncThunk(
  "FacebookImgPost",
  async (facebookImageData: facebookImageDataParams, { rejectWithValue }) => {
    await axios
      .post(
        `${facebook}${facebookImageData?.PageID}/photos`,
        {
          message: facebookImageData.Caption,
          source: facebookImageData.file,
          access_token: facebookImageData?.access_token,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("Your Photo Post on Facebook SuccussFully!");
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);
export const FacebookVideosPost = createAsyncThunk(
  "FacebookVideosPost",
  async (facebookImageData: facebookImageDataParams, { rejectWithValue }) => {
    console.log("facebookImageData", facebookImageData);

    await axios

      .post(
        `${facebook}${facebookImageData.PageID}/videos?`,
        {
          description: facebookImageData.Caption,
          source: facebookImageData.file,
          access_token: facebookImageData.access_token,
          file_size: 22420886,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("Your Video Post Facebook SuccussFully!");
      })
      .catch((errr) => {
        console.log(errr);
      });
  }
);
export const pageList = createAsyncThunk(
  "pageList",
  async (data: any, { rejectWithValue }) => {
    const PageData = [];
    try {
      const Responese = await axios.get(
        `${facebook}me/accounts?access_token=${data.accessToken}`
      );
      for (const i in Responese.data.data) {
        const Result = await axios.post(
          `${facebook}oauth/access_token?`,
          null,
          {
            params: {
              grant_type: "fb_exchange_token",
              client_id: 184681667978801,
              client_secret: "efdf52f029001efb72df382c05344c8c",
              fb_exchange_token: Responese.data.data[i].access_token,
            },
          }
        );
        PageData.push({
          ...Result.data,
          ["PageName"]: Responese.data.data[i].name,
          ["PageID"]: Responese.data.data[i].id,
        });
      }
      return PageData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
