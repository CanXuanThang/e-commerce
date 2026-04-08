import cloudinary from "../config/cloudinary";
import { ProductImage } from "../models/ProductImage";
import { ApiError } from "../utils/apiError";

const getImagesByVariantId = async (variantId: number) => {
  return ProductImage.findAll({ where: { variantId } });
};

const createProductImage = async (variantId: number, imageUrl: string) => {
  return ProductImage.create({ variantId, imageUrl });
};

const deleteProductImage = async (id: number) => {
  const productImage = await ProductImage.findByPk(id);
  if (!productImage) {
    throw new ApiError(404, "Product image not found");
  }
  const publicId = productImage.imageUrl
    .split("/")
    .slice(-2)
    .join("/")
    .split(".")[0];

  await cloudinary.uploader.destroy(publicId);

  return productImage.destroy();
};

const createMany = async (data: any[]) => {
  return ProductImage.bulkCreate(data);
};

export const productImageService = {
  getImagesByVariantId,
  createMany,
  createProductImage,
  deleteProductImage,
};
