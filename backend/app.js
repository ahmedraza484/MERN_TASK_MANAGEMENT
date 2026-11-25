import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: process.env.FRONTEND_URL,
  }),
);

export default app;
