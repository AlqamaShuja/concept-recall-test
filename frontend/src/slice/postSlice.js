import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/axiosConfig';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async ({ userId, page, limit }, { rejectWithValue }) => {
    try {
      console.log("fetchUserPostss");
      const response = await Axios.get(`/posts/user/${userId}`, {
        params: { page, limit },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch posts');
    }
  }
);
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      console.log("fetchAllPosts");
      const response = await Axios.get(`/posts`, { params: { page, limit },});
      return response;
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch posts');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default postSlice.reducer;
