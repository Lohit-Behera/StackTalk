import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/UserModel";

const createUser = asyncHandler(async (req, res) => {
  const { userName } = req.body;
  if (!userName) {
    return new ApiResponse(400, null, "User name is required");
  }
  const user = await User.create({ username: userName });
  return new ApiResponse(201, user, "User created successfully");
});

const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return new ApiResponse(400, null, "User name is required");
  }
  const user = await User.findOne({ username });
  if (!user) {
    return new ApiResponse(404, null, "User not found");
  }
  return new ApiResponse(200, user, "User found successfully");
});

export { createUser, getUser };
