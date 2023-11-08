import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type InitialState = {
    loading: boolean;
    news: [];
    error: string;
}

const initialState: InitialState = {
    loading: false,
    news: [],
    error: ''
}


export const fetchNewsData = createAsyncThunk('post/fetchNewsData', async() => {
    return axios
        .get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=9b64bcfe576047ba8e5bb7fd24c9e526')
        .then(response =>response.data)
      
        .catch(err => console.log(err)
        )
})

const NewsData = createSlice({
    name: "News",
    initialState,
    reducers: {},
    extraReducers: builder => {
      
        builder.addCase(fetchNewsData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchNewsData.fulfilled, (state, action: PayloadAction<[]>) => {
            state.loading = false,
                state.news = action.payload,
                state.error = ''
        }
        )
        builder.addCase(fetchNewsData.rejected, (state, action) => {
            state.loading = false
            state.news = []
            state.error = action.error.message || 'Something went wrong'
        })
  
    }
})


export default NewsData.reducer;