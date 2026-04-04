import cloudinary from "../config/cloudinary";
import { ProductImage } from "../models/ProductImage";

const getImagesByProductId = async (productId: number) => {
  return ProductImage.findAll({ where: { productId } });
};

const createProductImage = async (productId: number, imageUrl: string) => {
  return ProductImage.create({ productId, imageUrl });
};

const deleteProductImage = async (id: number) => {
  const productImage = await ProductImage.findByPk(id);
  if (!productImage) {
    throw new Error("Product image not found");
  }
  const publicId = productImage.imageUrl
    .split("/")
    .slice(-2)
    .join("/")
    .split(".")[0];

  await cloudinary.uploader.destroy(publicId);

  await productImage.destroy();
  return productImage.destroy();
};

const createMany = async (data: any[]) => {
  return ProductImage.bulkCreate(data);
};

export const productImageService = {
  getImagesByProductId,
  createMany,
  createProductImage,
  deleteProductImage,
};
