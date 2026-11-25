import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddlerware } from "./src/middlewares/errorMiddleware.js";
import userRoutes from "./src/routes/user.route.js";

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
app.use("/api/v1/user", userRoutes);

app.use(errorMiddlerware);

export default app;
