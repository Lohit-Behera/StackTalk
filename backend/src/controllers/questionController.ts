import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Question } from "../models/Question";
import { User } from "../models/UserModel";

const createQuestion = asyncHandler(async (req, res) => {
  const { username, title, body } = req.body;
  if (!username || !title || !body) {
    return new ApiResponse(400, null, "All fields are required");
  }
  const user = await User.findOne({ username });
  if (!user) {
    return new ApiResponse(404, null, "User not found");
  }
  const question = await Question.create({ username, title, body });
  return new ApiResponse(201, question, "Question created successfully");
});

const getQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question) {
    return new ApiResponse(404, null, "Question not found");
  }
  return new ApiResponse(200, question, "Question found successfully");
});

const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();
  return new ApiResponse(200, questions, "Questions found successfully");
});

const userQuestions = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return new ApiResponse(404, null, "User not found");
  }
  const questions = await Question.find({ username });
  return new ApiResponse(200, questions, "Questions found successfully");
});

export { createQuestion, getQuestion, getAllQuestions, userQuestions };
