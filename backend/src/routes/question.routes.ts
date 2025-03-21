import { Router } from "express";
import {
  createQuestion,
  getQuestion,
  getAllQuestions,
  userQuestions,
} from "../controllers/questionController";

const router = Router();

router.post("/create", createQuestion);
router.get("/get/:username", getQuestion);
router.get("/all", getAllQuestions);
router.get("/user/:username", userQuestions);

export default router;
