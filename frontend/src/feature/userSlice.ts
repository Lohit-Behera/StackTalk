import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/lib/proxy";

interface User {
  username: string;
  questions: string[];
  _id: string;
}

export const fetchCreateUser = createAsyncThunk(
  "user/fetchCreateUser",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/create`, {
        username,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message ??
        err.message ??
        "An unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    createUser: {
      data: JSON.parse(localStorage.getItem("user") || "{}") || ({} as User),
    },
    createUserStatus: "idle",
    createUserError: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.pending, (state) => {
        state.createUserStatus = "loading";
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.createUserStatus = "succeeded";
        state.createUser.data = action.payload;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.createUserStatus = "failed";
        state.createUserError = action.payload || "Failed to create user";
      });
  },
});

export default userSlice.reducer;
