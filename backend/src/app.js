import express, { urlencoded } from "express";
import morgan from "morgan";
import urlRouter from "./routes/url.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// configure cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
  }),
);

// url routes
app.use("/api/url", urlRouter);

export default app;
