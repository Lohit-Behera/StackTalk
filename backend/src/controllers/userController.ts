import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/UserModel";

const createUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User name is required"));
  }

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, "User already exists"));
  }

  const user = await User.create({ username: username });
  res.status(201).json(new ApiResponse(201, user, "User created successfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User name is required"));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  res.status(200).json(new ApiResponse(200, user, "User found successfully"));
});

export { createUser, getUser };
