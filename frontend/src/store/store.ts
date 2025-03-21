import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/feature/userSlice";
import questionSlice from "@/feature/questionSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
