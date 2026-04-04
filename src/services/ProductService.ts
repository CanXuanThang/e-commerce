import { ca } from "zod/v4/locales";
import { Categories } from "../models/Categories";
import { ProductImage } from "../models/ProductImage";
import { Products } from "../models/Products";

interface ICreateProduct {
  name: string;
  description?: string;
  price: number;
  size: string;
  quantity: number;
  categoryId: number;
}

const getAllProducts = async () => {
  try {
    return Products.findAll({
      attributes: ["id", "name", "price", "quantity", "categoryId"],
      include: [
        {
          model: Categories,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: ProductImage,
          as: "images",
          attributes: ["id", "imageUrl"],
        },
      ],
    });
  } catch (error) {
    console.error("🔥 MESSAGE:", error);
  }
};

const createProduct = async (payload: ICreateProduct) => {
  return Products.create(payload);
};

const getProductById = async (id: number) => {
  return Products.findByPk(id, {
    attributes: ["id", "name", "price", "quantity", "categoryId"],
    include: [
      {
        model: Categories,
        as: "category",
        attributes: ["id", "name"],
      },
      {
        model: ProductImage,
        as: "images",
        attributes: ["id", "imageUrl"],
      },
    ],
  });
};

const updateProduct = async (id: number, payload: Partial<ICreateProduct>) => {
  const product = await Products.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product.update(payload);
};

const deleteProduct = async (id: number) => {
  const product = await Products.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product.destroy();
};

const getProductsByCategoryId = async (categoryId: number) => {
  const category = await Categories.findByPk(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  const products = await Products.findAll({ where: { categoryId } });

  return { category, products };
};

export const productService = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
};
