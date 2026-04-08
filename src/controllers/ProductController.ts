import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import { productService } from "../services/ProductService";

const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productService.getAllProducts();

    return response.ok(res, products, "Get all products successfully");
  } catch (error) {
    next(error);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];

    let uploadedImages: string[] = [];

    if (files?.length) {
      uploadedImages = await Promise.all(files.map((file) => file.path));
    }

    const variants = JSON.parse(req.body.variants);

    // gán image theo variant index
    variants.forEach((variant: any, index: number) => {
      variant.images = uploadedImages[index]
        ? [
            {
              imageUrl: uploadedImages[index],
              isPrimary: true,
            },
          ]
        : [];
    });

    const product = await productService.createProduct({
      ...req.body,
      variants,
    });

    return response.ok(res, product, "Product created successfully");
  } catch (error) {
    next(error);
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return response.badRequest(res, null, "Invalid product id");
    }

    const product = await productService.getProductById(id);

    if (!product) {
      return response.notFound(res, null, "Product not found");
    }

    return response.ok(res, product, "Product found successfully");
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return response.badRequest(res, null, "Invalid product id");
    }

    const product = await productService.updateProduct(id, req.body);

    return response.ok(res, product, "Product updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return response.badRequest(res, null, "Invalid product id");
    }

    const product = await productService.getProductById(id);

    if (!product) {
      return response.notFound(res, null, "Product not found");
    }

    await productService.deleteProduct(id);

    return response.ok(res, null, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};

const getProductsByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = Number(req.params.categoryId);

    if (!categoryId) {
      return response.badRequest(res, null, "Invalid category id");
    }

    const result = await productService.getProductsByCategoryId(categoryId);

    return response.ok(res, result, "Get products by category id successfully");
  } catch (error) {
    next(error);
  }
};

export const productController = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
};
