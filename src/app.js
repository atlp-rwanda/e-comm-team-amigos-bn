import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(cors());

export default app;
