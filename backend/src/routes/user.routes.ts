import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";

const router = Router();

router.post("/create", createUser);
router.get("/:username", getUser);

export default router;
