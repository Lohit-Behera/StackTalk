import mongoose, { Schema } from "mongoose";

interface IQuestion {
  username: string;
  title: string;
  body: string;
  answers: { username: string; answer: string; createdAt: Date }[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new mongoose.Schema<IQuestion>(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    answers: [
      {
        username: String,
        answer: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
