import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../utils/axiosConfig';

// Thunk to fetch paginated users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit }) => {
    try {
      const response = await Axios.get(`/users?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const fetchUserGrowthOfPostAndFollowData = createAsyncThunk('users/fetchUserDetails', 
  async (userId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/users/${userId}/growth-followers-post`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);


export const getUserbyId = createAsyncThunk(
  'users/getUserbyId', 
  async (userId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/users/${userId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);


const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    currentPage: 1,
    totalPages: 0,
    totalUsers: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalUsers = action.payload.totalUsers;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage } = userSlice.actions;
export default userSlice.reducer;
