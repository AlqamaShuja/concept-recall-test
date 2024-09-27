import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers', 
    async () => {
        const response = await fetch('/api/users'); // API endpoint for users
        return response.json();
    }
);

const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
