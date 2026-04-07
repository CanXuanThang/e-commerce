import cloudinary from "../config/cloudinary";
import { Banners } from "../models/Banners";
import { ApiError } from "../utils/apiError";

interface IBanner {
  imageUrl: string;
  order: number;
}

const getAllBanners = async () => {
  return Banners.findAll();
};

const updateBanner = async (id: number, banner: IBanner) => {
  const existingBanner = await Banners.findByPk(id);
  if (!existingBanner) {
    throw new ApiError(404, "Banner not found");
  }

  return existingBanner.update(banner);
};

const deleteBanner = async (id: number) => {
  const existingBanner = await Banners.findByPk(id);
  if (!existingBanner) {
    throw new ApiError(404, "Banner not found");
  }
  const publicId = existingBanner.imageUrl
    .split("/")
    .slice(-2)
    .join("/")
    .split(".")[0];

  await cloudinary.uploader.destroy(publicId);

  return existingBanner.destroy();
};

const getBannerById = async (id: number) => {
  return Banners.findByPk(id);
};

const createMany = async (data: any[]) => {
  return Banners.bulkCreate(data);
};

export const bannerService = {
  getAllBanners,
  updateBanner,
  deleteBanner,
  getBannerById,
  createMany,
};
