import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/axiosConfig';

const initialState = {
  total_users: 0,
  total_posts: 0,
  total_followers: 0,
  total_followings: 0,
  usersOverTime: [],
  postsOverTime: [],
  status: 'idle',
  error: null,
};

export const fetchMetrics = createAsyncThunk(
  'metrics/fetchMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get('/metrics');
      return response;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const fetchUsersPostsOverTime = createAsyncThunk(
  'metrics/fetchUsersPostsOverTime',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get('/metrics/over-time');
      return response;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.total_users = action.payload.total_users;
        state.total_posts = action.payload.total_posts;
        state.total_followers = action.payload.total_followers;
        state.total_followings = action.payload.total_followings;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUsersPostsOverTime.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersPostsOverTime.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersOverTime = action.payload.usersAdded;
        state.postsOverTime = action.payload.postsAdded;
      })
      .addCase(fetchUsersPostsOverTime.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default metricsSlice.reducer;
