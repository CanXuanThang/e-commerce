import { ProductSize } from "../models/ProductSize";
import { ApiError } from "../utils/apiError";

export interface SizeInput {
  size: string;
  quantity: number;
  price: number;
}

export interface CreateSize extends SizeInput {
  variantId: number;
}

const createProductSize = async (data: CreateSize[]) => {
  return ProductSize.bulkCreate(data);
};

const updateProductSize = async (id: number, data: SizeInput) => {
  const size = await ProductSize.findByPk(id);

  if (!size) {
    throw new ApiError(404, "Not found !");
  }

  return size.update(data);
};

const deleteSize = async (id: number) => {
  const size = await ProductSize.findByPk(id);

  if (!size) {
    throw new ApiError(404, "Not found !");
  }

  return size.destroy();
};

const checkQuantityById = async (id: number, quantity: number) => {
  const size = await ProductSize.findByPk(id);

  if (!size) {
    throw new ApiError(404, "Not found !");
  }

  return size.quantity > quantity;
};

export const productSizeService = {
  createProductSize,
  updateProductSize,
  deleteSize,
  checkQuantityById,
};
