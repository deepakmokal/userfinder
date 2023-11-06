import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username) => {
    
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          auth: import.meta.env.VITE_GITHUB_ACCESS_KEY,
        },
      }
    );
    return response.data;
  }
);

export const fetchUserRepo = createAsyncThunk(
  "user/fetchUserRepo",
  async (name) => {
    
    const response = await axios.get(
      `https://api.github.com/users/${name}/repos`,
      {
        headers: {
          auth: import.meta.env.VITE_GITHUB_ACCESS_KEY,
        },
        params: {
          sort: 'created',
          direction: 'desc'
        }
      }
    );
    
    const repos = response.data
    return repos.slice(0, 5);
  }
);

const initialState = {
  user: [],
  nameOfUser: 'deepakmokal',
  userRepo: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.nameOfUser = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = [action.payload];
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUserRepo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRepo.fulfilled, (state, action) => {
        state.loading = false;
        state.userRepo = [action.payload];
      })
      .addCase(fetchUserRepo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateUsername } = userSlice.actions

export default userSlice.reducer;
