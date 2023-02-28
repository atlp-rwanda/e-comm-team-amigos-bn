import http from "http";
import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.server = server;
export default app;
