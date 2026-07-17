import UrlModel from "../models/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { nanoid } from "nanoid";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customName } = req.body;
  let shortCode;

  // throw error if there is no url given by the user
  if (!originalUrl) {
    throw new ApiError(400, "No url found");
  }

  // check wether the shortcode already exists
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

  // increment the count of the clicks whenever user request the url
  UrlModel.updateOne({ shortCode }, { $inc: { clicks: 1 } }).catch((err) =>
    console.error("click update failed:", err),
  );

  return res.redirect(urlRecord.originalUrl);
});
