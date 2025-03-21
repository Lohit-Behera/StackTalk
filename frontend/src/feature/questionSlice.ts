import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/lib/proxy";

export const createQuestion = createAsyncThunk(
  "question/createQuestion",
  async (
    question: { title: string; body: string; username: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/api/question/create`, {
        question,
      });
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

export const getQuestion = createAsyncThunk(
  "question/getQuestion",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/question/get/${id}`);
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

export const fetchAllQuestions = createAsyncThunk(
  "question/fetchAllQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/question/getAll`);
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

export const fetchGetUserQuestions = createAsyncThunk(
  "question/fetchGetUserQuestions",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/question/user/${username}`
      );
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

const questionSlice = createSlice({
  name: "question",
  initialState: {
    createQuestion: { data: {} },
    createQuestionStatus: "idle",
    createQuestionError: {},
    getQuestion: { data: {} },
    getQuestionStatus: "idle",
    getQuestionError: {},
    getAllQuestions: { data: [] },
    getAllQuestionsStatus: "idle",
    getAllQuestionsError: {},
    getUserQuestions: { data: [] },
    getUserQuestionsStatus: "idle",
    getUserQuestionsError: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.createQuestionStatus = "loading";
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.createQuestionStatus = "succeeded";
        state.createQuestion.data = action.payload;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.createQuestionStatus = "failed";
        state.createQuestionError =
          action.payload || "Failed to create question";
      })
      .addCase(getQuestion.pending, (state) => {
        state.getQuestionStatus = "loading";
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.getQuestionStatus = "succeeded";
        state.getQuestion.data = action.payload;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.getQuestionStatus = "failed";
        state.getQuestionError = action.payload || "Failed to get question";
      })
      .addCase(fetchAllQuestions.pending, (state) => {
        state.getAllQuestionsStatus = "loading";
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.getAllQuestionsStatus = "succeeded";
        state.getAllQuestions.data = action.payload;
      })

      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.getAllQuestionsStatus = "failed";
        state.getAllQuestionsError =
          action.payload || "Failed to get all questions";
      })
      .addCase(fetchGetUserQuestions.pending, (state) => {
        state.getUserQuestionsStatus = "loading";
      })
      .addCase(fetchGetUserQuestions.fulfilled, (state, action) => {
        state.getUserQuestionsStatus = "succeeded";
        state.getUserQuestions.data = action.payload;
      })
      .addCase(fetchGetUserQuestions.rejected, (state, action) => {
        state.getUserQuestionsStatus = "failed";
        state.getUserQuestionsError =
          action.payload || "Failed to get user questions";
      });
  },
});

export default questionSlice.reducer;
