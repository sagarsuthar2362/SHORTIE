import express from "express";
import { createShortUrl, redirectUrl } from "../controllers/url.controller.js";

const urlRouter = express.Router();

urlRouter.post("/shorten", createShortUrl);
urlRouter.get("/:shortCode", redirectUrl);

export default urlRouter;
