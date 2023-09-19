import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface PostState {
    UserData: any[];
    loading: boolean;
    error: any;
};

const initialState: PostState = {
    UserData: [],
    loading: false,
    error: null,
};

export const ExtendToken = createAsyncThunk(
    'extentToken',
    async (data: any, { rejectWithValue }) => {
        try {
            const Responese = await axios.get(
                `https://graph.facebook.com/${data.Page_ID}?fields=access_token&access_token=${data.userToken}`
            );
            const Result = await axios.post(`https://graph.facebook.com/v17.0/oauth/access_token`, null, {
                params: {
                    grant_type: 'fb_exchange_token',
                    client_id: data.Client_ID,
                    client_secret: data.Client_Secret_Code,
                    fb_exchange_token: (Responese).data.access_token,
                },
            })
            alert("Access Token Generated....")
            return { ['access_token']: Result.data.access_token, ['Page_ID']: data.Page_ID }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const InstaPostImage = createAsyncThunk(
    'InstaPostImage',
    async (data: any, { rejectWithValue }) => {
        console.log(data);
        try {
            const Responese = await axios.post(
                ` https://graph.facebook.com/v17.0/${data.user_id}/media?`, {
                image_url: data.InstaImage,
                caption: data.Instacaption,
                access_token: data.token,
            });
            const Result = await axios.post(
                ` https://graph.facebook.com/v17.0/${data.user_id}/media_publish?`, {
                creation_id: Responese.data.id,
                access_token: data.token,
            });


            alert("Insta Post SuccussFully")

            return Result
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// export const InstaPostVideo = createAsyncThunk(
//     'InstaPostVideo',
//     async (data: any, { rejectWithValue }) => {
//         console.log(data);
//         try {
//             const Responese = await axios.post(
//                 ` https://graph.facebook.com/v17.0/${data.user_id}/media?`, {
//                 media_type: 'VIDEO',
//                 video_url: data.file,
//                 caption: data.Instacaption,
//                 access_token: data.token,
//             });
//             console.log(Responese);



//             const Result = await axios.post(
//                 ` https://graph.facebook.com/v17.0/${data.user_id}/media_publish?`, {
//                 creation_id: Responese.data.id,
//                 access_token: data.token,
//             });

//             alert("Insta Post Video SuccussFully")
//             console.log(Result);

//             return Result

//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );


// export const InstaPostVideo = createAsyncThunk(
//     'InstaPostVideo',
//     async (data: any, { rejectWithValue }) => {
//         console.log(data);
//         try {
//             // Step 1: Upload the video
//             const uploadResponse = await axios.post(
//                 `https://graph.facebook.com/v17.0/${data.user_id}/media?`, {
//                 media_type: 'VIDEO',
//                 video_url: data.Video_url,
//                 caption: data.Instacaption,
//                 access_token: data.token,
//             }
//             );

//             const creationId = uploadResponse.data.id;
//             console.log('Media creation ID:', creationId);

//             const publishResponse = await axios.post(
//                 `https://graph.facebook.com/v17.0/${data.user_id}/media_publish?`, {
//                 creation_id: creationId,
//                 access_token: data.token,
//             }
//             );
//             console.log(publishResponse);

//             return publishResponse.data
//         }
//         catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );

export const InstaPostVideo = createAsyncThunk(
    'InstaPostVideo',
    async (data: any, { rejectWithValue }) => {
        console.log(data);
        try {
            // Step 1: Upload the video
            const uploadResponse = await axios.post(
                `https://graph.facebook.com/v17.0/${data.user_id}/media?`, {
                media_type: 'VIDEO',
                video_url: data.Video_url,
                caption: data.Instacaption,
                access_token: data.token,
            }
            );
            await new Promise(resolve => setTimeout(resolve, 60000)); // 60 second
            const creationId = uploadResponse.data.id;
            console.log('Media :', uploadResponse);

            const publishResponse = await axios.post(
                `https://graph.facebook.com/v17.0/${data.user_id}/media_publish?`, {
                creation_id: creationId,
                access_token: data.token,
            }
            );
            console.log(publishResponse);
            alert('Instagram Video Posting...')
            return publishResponse.data;
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const TweetPost = createAsyncThunk(
    'TweetPost',
    async (data: any, { rejectWithValue }) => {
        console.log(data);
        try {
            const Responese = await axios.post(
                `https://api.twitter.com/2/tweets?`, {
                text: "Are you excited for the weekend?",
            });
            const Result = await axios.post(
                ` https://graph.facebook.com/v17.0/${data.user_id}/media_publish?`, {
                creation_id: Responese.data.id,
                access_token: data.token,
            });


            alert("Insta Post SuccussFully")

            return Result
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        PostImageFB: (state, action) => {
            axios.post(
                `https://graph.facebook.com/${state.UserData[0]['Page_ID']}/photos?`,
                {
                    message: action.payload.Caption,
                    url: action.payload.Image,
                    access_token: state.UserData[0]['access_token'],
                }
            ).then((res) => {
                console.log(res);
                alert("Image Post SuccussFully")
            }).catch((err) => {
                console.log(err);

            })
        },


        PostVideosFB: (state, action) => {

            axios.post(
                `https://graph-video.facebook.com/v17.0/${state.UserData[0]['Page_ID']}/videos?`, {
                description: action.payload.Caption,
                source: action.payload.file,
                access_token: state.UserData[0]['access_token'],
                file_size: 22420886
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                alert("Video Post SuccussFully")
                console.log(res);
            }).catch((errr) => {
                console.log(errr);

            })
        },


    },



    extraReducers: (builder) => {
        builder
            .addCase(ExtendToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ExtendToken.fulfilled, (state, action) => {
                state.UserData.push(action.payload)
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



    },
});



export const { PostImageFB, PostVideosFB } = userSlice.actions
export default userSlice.reducer;