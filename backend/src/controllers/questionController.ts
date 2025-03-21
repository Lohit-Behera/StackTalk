import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Question } from "../models/Question";
import { User } from "../models/UserModel";

const createQuestion = asyncHandler(async (req, res) => {
  const { username, title, body } = req.body;

  if (!username || !title || !body) {
    return res.status(400).json(new ApiResponse(400, null, "Missing fields"));
  }
  const user = await User.findOne({ username });
  if (!user) {
    return new ApiResponse(404, null, "User not found");
  }
  const question = await Question.create({ username, title, body });
  return res
    .status(201)
    .json(new ApiResponse(201, question, "Question created"));
});

const getQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Question not found"));
  }
  return res.status(200).json(new ApiResponse(200, question, "Question found"));
});

const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();
  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Questions found"));
});

const userQuestions = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  const questions = await Question.find({ username });
  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Questions found"));
});

export { createQuestion, getQuestion, getAllQuestions, userQuestions };
