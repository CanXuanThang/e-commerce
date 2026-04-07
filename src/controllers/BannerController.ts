import { NextFunction, Request, Response } from "express";
import { bannerService } from "../services/BannerService";
import { response } from "../utils/response";

const getAllBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const banners = await bannerService.getAllBanners();

    return response.ok(res, banners, "Success");
  } catch (err) {
    next(err);
  }
};

const updateBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { order } = req.body;
    const id = parseInt(req.params.id as string);
    if (!req.files) {
      throw new Error("Images required");
    }
    const files = req.files as Express.Multer.File[];

    const data = files.map((file) => ({
      imageUrl: file.path,
    }));

    await bannerService.updateBanner(id, { imageUrl: data[0].imageUrl, order });

    return response.ok(res, null, "Update successfuly !");
  } catch (err) {
    next(err);
  }
};

const deleteBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    await bannerService.deleteBanner(id);

    return response.ok(res, null, "Delete successfuly !");
  } catch (err) {
    next(err);
  }
};

export const bannerController = {
  getAllBanner,
  deleteBanner,
  updateBanner,
};
