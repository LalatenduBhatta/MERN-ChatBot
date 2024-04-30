import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production
app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// route api
app.use("/api/v1", appRouter);

//connections
app.get("/", (req, res, next) => {
  res.send("<h1>HELLO</h1>");
});

export default app;
