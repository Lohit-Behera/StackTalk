import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// import routes
import userRouter from "./routes/user.routes";
import questionRouter from "./routes/question.routes";

// Routes
app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);

export { app };
