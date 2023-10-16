import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




type InitialState = {
    loading: boolean;
    users: [];
    error: string;
}


const initialState: InitialState = {
    loading: false,
    users: [],
    error: ''
}


// Generates pending, fulfilled and rejected action types
export const fetchPostData = createAsyncThunk('post/fetchPostData', () => {
    return axios
        .get('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=9b64bcfe576047ba8e5bb7fd24c9e526')
        .then(response =>response.data)
        .catch(err => console.log(err)
        )
})



const postData = createSlice({
    name: "News",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPostData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPostData.fulfilled, (state, action: PayloadAction<[]>) => {
            state.loading = false,
                state.users = action.payload,
                state.error = ''
        }
        )
        builder.addCase(fetchPostData.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message || 'Something went wrong'
        })
       
  
    }
})


export default postData.reducer;