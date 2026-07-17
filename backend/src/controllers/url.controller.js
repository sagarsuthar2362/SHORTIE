import UrlModel from "../models/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { nanoid } from "nanoid";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customName } = req.body;
  let shortCode;

  if (!originalUrl) {
    throw new ApiError(400, "No url found");
  }

  if (customName) {
    const nameExists = await UrlModel.findOne({ shortCode: customName });

    if (nameExists) {
      throw new ApiError(400, "Short code already exists");
    }

    shortCode = customName;
  } else {
    shortCode = nanoid(6);

    const codeExists = await UrlModel.findOne({ shortCode });

    if (codeExists) {
      throw new ApiError(400, "Short code already exists");
    }
  }

  const newUrl = await UrlModel.create({
    shortCode,
    originalUrl,
    user: req.user?.id || null,
  });

  return res.status(201).json({
    success: true,
    message: "short code generated succesfully",
    newUrl,
  });
});

export const redirectUrl = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const urlRecord = await UrlModel.findOne({ shortCode });

  if (!urlRecord) {
    throw new ApiError(404, "url does not exist");
  }

  urlRecord.clicks = (urlRecord.clicks || 0) + 1;
  urlRecord.save();

  return res.redirect(urlRecord.originalUrl);
});
